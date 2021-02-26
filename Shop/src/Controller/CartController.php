<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ArticleRepository;
use App\Entity\Product;
use App\Entity\Order;
use App\Entity\OrderProduct;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ProductRepository;



class CartController extends AbstractController
{
    /**
     * @Route("/cart", name="cart_index")
     */
    public function index( Request $request, ProductRepository $productrepo): Response
    {
        $session = $request->getSession();
        $cart = $session->get('cart', []);

        $totalPrice = 0;
        $cartShow = [];
        foreach($cart as $id => $quantity){
            $p = $productrepo->find($id);
            $totalPrice = $totalPrice + ($p->getPrice() * $quantity);
            $cartShow[] = [
                'product' => $p,
                'quantity'=> $quantity
            ];
        }
        return $this->render('cart/index.html.twig', [
            'controller_name' => 'CartController',
            'cart' => $cartShow,
            'totalPrice' => $totalPrice
        ]);
    }

    /**
     * @Route("/cart/addProduct/{id}", name="cart")
     */
    public function addProduct(Product $product,EntityManagerInterface $manager, ProductRepository $repo, Request $request ): Response
    {
        $session = $request->getSession();
        $cart = $session->get('cart', []);

        if(!empty($cart[$product->getId()])){
            $cart[$product->getId()]++;        
        }
        else{
            $cart[$product->getId()] = 1;        
        }
                 
        $session->set('cart',$cart);



    //     $order = new Order();
    //     $order-> setCreatedAt(new \DateTime());
    //     $order->setCustomerName("Jean-François");
    //     $order->setEmail("salut@ecam.be");
    //     $order->setTotalPrice(200);
    //     $order->setValidated(0);

    //     $manager->persist($order);
    //     $manager->flush();

    //     $orderproduct = new OrderProduct();
    //     $orderproduct->setProductID($product);
    //     $orderproduct->setOrderID($order);
    //     $orderproduct->setNumber(5);

    //     $manager->persist($orderproduct);
    //     $manager->flush();

    //     $orderproduct = $repo->findBy(
    //         ['orderID' => 11]
    //     );
        
    //    // $orderproduct = $repo->findAll();
        
    return $this->redirectToRoute('cart_index');

    //dd($cart);
    //    return $this->render('cart/index.html.twig', [
    //         'controller_name' => 'CartController',
    //         'product' => $cart
    //     ]);
    }

}
