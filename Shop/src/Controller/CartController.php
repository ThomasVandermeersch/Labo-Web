<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ArticleRepository;
use App\Entity\Product;
use App\Entity\Order;
use App\Entity\OrderProduct;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\OrderProductRepository;



class CartController extends AbstractController
{
    /**
     * @Route("/cart", name="cart")
     */
    public function index(): Response
    {
        return $this->render('cart/index.html.twig', [
            'controller_name' => 'CartController',
        ]);
    }

    /**
     * @Route("/cart/addProduct/{id}", name="cart")
     */
    public function addProduct(Product $product,EntityManagerInterface $manager, OrderProductRepository $repo ): Response
    {
        $order = new Order();
        $order-> setCreatedAt(new \DateTime());
        $order->setCustomerName("Jean-François");
        $order->setEmail("salut@ecam.be");
        $order->setTotalPrice(200);
        $order->setValidated(0);

        $manager->persist($order);
        $manager->flush();

        $orderproduct = new OrderProduct();
        $orderproduct->setProductID($product);
        $orderproduct->setOrderID($order);
        $orderproduct->setNumber(5);

        $manager->persist($orderproduct);
        $manager->flush();

        $orderproduct = $repo->findBy(
            ['orderID' => 11]
        );
        
       // $orderproduct = $repo->findAll();
        
       return $this->render('cart/index.html.twig', [
            'controller_name' => 'CartController',
            'product' => $orderproduct
        ]);
    }

}
