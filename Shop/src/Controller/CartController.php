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
use Symfony\Component\HttpFoundation\Session\SessionInterface;



class CartController extends AbstractController
{
    /**
     * @Route("/cart", name="cart_index")
     */
    public function index( SessionInterface $session, ProductRepository $productrepo): Response
    {
        $cart = $session->get('cart', []); // if there is no cart in session, the function returns []
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
        $session->set('totalPrice',$totalPrice); //Put totalPrice in Session for later use

        return $this->render('cart/index.html.twig', [
            'controller_name' => 'CartController',
            'cart' => $cartShow,
            'totalPrice' => $totalPrice
        ]);
    }

    /**
     * @Route("/cart/addProduct/{id}", name="cart")
     */
    public function addProduct(Product $product,EntityManagerInterface $manager, Request $request ): Response
    {
        $session = $request->getSession();
        $cart = $session->get('cart', []);

        // If same product in the cart, increase quantity
        if(!empty($cart[$product->getId()])){
            $cart[$product->getId()]++;        
        }
        else{
            $cart[$product->getId()] = 1; // add product to the cart with quantity 1
        }
                 
        $session->set('cart',$cart);
        return $this->redirectToRoute('cart_index');
    }


    /**
     * @Route("/cart/removeOneProduct/{id}", name="cart_removeOne")
     */
    public function removeOneProduct(Product $product,EntityManagerInterface $manager, ProductRepository $repo, Request $request ): Response
    {
        $session = $request->getSession();
        $cart = $session->get('cart', []);
        
        if($cart[$product->getId()] ==1){
            unset($cart[$product->getId()]);
            $session->set('cart',$cart); // remove the product from the cart
        }
        else{
            $cart[$product->getId()]--;   // decrease quantity.              
            $session->set('cart',$cart);
        }
        return $this->redirectToRoute('cart_index');
    }

    /**
     * @Route("/cart/removeProduct/{id}", name="cart_remove")
     */
    public function removeProduct(Product $product,EntityManagerInterface $manager, ProductRepository $repo, Request $request ): Response
    {
        $session = $request->getSession();
        $cart = $session->get('cart', []);
        unset($cart[$product->getId()]); // remove product from the cart
        $session->set('cart',$cart);
        return $this->redirectToRoute('cart_index');
    }
}