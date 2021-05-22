<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\OrderProduct;

use App\Repository\OrderRepository;
use App\Repository\ProductRepository;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;



class ApiOrderController extends AbstractController
{
    /**
     * @Route("/api/order", name="api_orderAll",methods={"GET"})
     */
    public function index()
    {
        //Find and return all orders
        $repo = $this->getDoctrine()->getRepository(Order::class);
        $products = $repo->findAll();
        return $this->json($products,200,['Access-Control-Allow-Origin'=> 'http://localhost:4200'],['groups' => 'order:readAll']);
    }

    /**
     * @Route("/api/order/{id}", name="api_orderOne",methods={"GET"})
     */
    public function singleOrder($id)
    {
        //Find and return a single order
        $repo = $this->getDoctrine()->getRepository(Order::class);
        $order = $repo->find($id);
        return $this->json($order,200,['Access-Control-Allow-Origin'=> 'http://localhost:4200'],['groups' => 'order:readOne']);
    }

    /**
     * @Route("/api/order/new", name="api_order_new",methods={"POST","OPTIONS"})
     */
    public function newOrder(Request $request, SerializerInterface $serializer, EntityManagerInterface $em,
    ValidatorInterface $validator,ProductRepository $productrepo)
    {
        if ($request->isMethod('OPTIONS')) {
            return $this->json([], 200, ["Access-Control-Allow-Origin" => "http://localhost:4200", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"]);
        }

        try{
            $json = $request->getContent();
            $newOrder = json_decode($json);
            
            // Create a new Order
            $dbOrder = new Order();
            $dbOrder->setTotalPrice($newOrder->totalPrice);
            $dbOrder->setCustomerName($newOrder->customerName);
            $dbOrder->setEmail($newOrder->email);
            $dbOrder->setCreatedAt(new \DateTime());
            $dbOrder->setValidated(0);

            //Check if order data is consistent

            $errors = $validator->validate($dbOrder);
            if(count($errors)>0){
                return $this->json($errors, 400,["Access-Control-Allow-Origin" => "http://localhost:4200", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"],['groups'=>'product:read']);
            }
            $em->persist($dbOrder);
            $em->flush();          
            
            $cart = (array) $newOrder->cart;

            // Add the products in the cart to the database
            foreach($cart as $id => $quantity){
                $orderProduct = new OrderProduct();
                $orderProduct->setProductID($productrepo->find(intval($id)));
                $orderProduct->setOrderID($dbOrder);
                $orderProduct->setNumber($quantity);

                $em->persist($orderProduct);
                $em->flush();
            }
            // If everithing works good
            return $this->json($dbOrder,201,["Access-Control-Allow-Origin" => "http://localhost:4200", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"],['groups'=>'product:read']);

        }catch(NotEncodableValueException $e){
            return $this->json([
                'status'=>400 ,
                'message'=> $e->getMessage()
            ], 400, ["Access-Control-Allow-Origin" => "http://localhost:4200", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"],['groups'=>'product:read']);
        }
    }

    /**
     * @Route("/api/order/remove/{id}", name="api_order_remove",methods={"DELETE","OPTIONS"})
     */
    public function deleteOrder(Order $order, Request $request, EntityManagerInterface $em){
        if ($request->isMethod('OPTIONS')) {
            return $this->json([], 200, ["Access-Control-Allow-Origin" => "http://localhost:4200", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"]);
        }
        try{
            $orderProducts = $order->getOrderProducts();
            $em->remove($order);             //Remove the order from the database.
            $em->flush();
            return $this->json('{"status":"Removed succesfull"}',201,["Access-Control-Allow-Origin" => "*", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"],['groups'=>'product:read']);

        } catch(\Exception $e){
           return $this->json($e,400,["Access-Control-Allow-Origin" => "*", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"],['groups'=>'product:read']);

        }
    }
}
