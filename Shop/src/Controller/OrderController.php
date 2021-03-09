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
        
        $user = $session->get('user', '');
        if($user == 'admin'){
            $orders = $orderRepo->findAll();
            return $this->render('order/seeOrder.html.twig',[
                'orders'=> $orders
            ]);
        }

        else{
            return $this->redirectToRoute("product");
        }
    }

    /**
     * @Route("/order/see/{id}", name="orderSpecific")
     */
    public function seeOrder(Order $order){
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

}
