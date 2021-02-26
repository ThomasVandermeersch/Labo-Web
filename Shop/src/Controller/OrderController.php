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





class OrderController extends AbstractController
{
    /**
     * @Route("/order", name="order_make")
     */
    public function newOrder(Request $request,EntityManagerInterface $manager,ProductRepository $productrepo)
    {
        //if(! $product){
            $order = new Order();
        //}
        // $form = $this->createFormBuilder($product) //création d'un form lié à l'article.
        //             ->add('name')
        //             ->add('description')
        //             ->add('price')
        //             ->add('url')
        //             ->getForm();
        
        $form = $this->createForm(OrderType::class,$order);
        $form->handleRequest($request);
        dump($order);
        
        if($form->isSubmitted() && $form->isValid()){
            $order->setCreatedAt(new \DateTime());
            $order->setTotalPrice(200);
            $order->setValidated(0);
            $manager->persist($order);
            $manager->flush();
            
            $session = $request->getSession();
            $cart = $session->get('cart', []);
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

    public function seeOrders(OrderRepository $orderRepo){
        $orders = $orderRepo->findAll();
        return $this->render('order/seeOrder.html.twig',[
            'orders'=> $orders
        ]);
    }

    /**
     * @Route("/order/see/{id}", name="orderSpecific")
     */
    public function seeOrder(Order $order){
        
        return $this->render('order/seeSpecifcOrder.html.twig',[
            'order'=> $order
        ]);
    }
}
