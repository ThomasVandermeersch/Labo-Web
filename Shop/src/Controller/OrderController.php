<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Order;
use App\Entity\OrderProduct;

use App\Form\OrderType;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ProductRepository;
use App\Repository\OrderRepository;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class OrderController extends AbstractController
{
    /**
     * @Route("/order", name="order_make")
     */
    public function newOrder(Request $request, SessionInterface $session,EntityManagerInterface $manager,ProductRepository $productrepo)
    {
        // Create a new Order
        
        $order = new Order();
        $form = $this->createForm(OrderType::class,$order);
        $form->handleRequest($request);
        
        $totalPrice = $session->get('totalPrice', 0);
        if($form->isSubmitted() && $form->isValid()){
            $order->setCreatedAt(new \DateTime());
            $order->setTotalPrice($totalPrice);
            $order->setValidated(0);
            $manager->persist($order);
            $manager->flush();
            
            $cart = $session->get('cart', []);
            
            // Add products of the cart to the database
            foreach($cart as $id => $quantity){
                $orderProduct = new OrderProduct();
                $orderProduct->setProductID($productrepo->find($id));
                $orderProduct->setOrderID($order);
                $orderProduct->setNumber($quantity);

                $manager->persist($orderProduct);
                $manager->flush();
                $session->set('cart',[]);
            }
            return $this->redirectToRoute("product");
        } 

        return $this->render('order/index.html.twig', [
            'formOrder' => $form->createView()
            ]);
    }

    /**
     * @Route("/order/see", name="order")
     */

    public function seeOrders(SessionInterface $session,OrderRepository $orderRepo){
        // Check if user has access to the orders
        $user = $session->get('user', '');
        if($user == 'admin'){
            // Return all orders
            $orders = $orderRepo->findAll();
            return $this->render('order/seeOrder.html.twig',[
                'orders'=> $orders
            ]);
        }

        
        else{
            return $this->redirectToRoute("product"); //no access
        }
    }

    /**
     * @Route("/order/see/{id}", name="orderSpecific")
     */
    public function seeOrder(SessionInterface $session,Order $order){
        // Check if user has access to the orders
        $user = $session->get('user', '');
        if($user == 'admin'){
            return $this->render('order/seeSpecifcOrder.html.twig',[
                'order'=> $order
            ]);
        }
        else{
            return $this->redirectToRoute("product");
        }
    }

    /**
    * @Route("/order/remove/{id}",name="remove_order")
    */
    public function removeOrder(Order $order, EntityManagerInterface $em,  SessionInterface $session){
        // Check if user has access to the orders

        $user = $session->get('user', '');
        if($user != 'admin') return $this->redirectToRoute("product");
        
        //If access
        $em->remove($order);
        $em->flush();
        return $this->redirectToRoute("product");
    }

}
