<?php

namespace App\Controller;

use App\Entity\Order;
use App\Repository\OrderRepository;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;



class ApiOrderController extends AbstractController
{
    /**
     * @Route("/api/order", name="api_order",methods={"GET"})
     */
    public function index()
    {
        $repo = $this->getDoctrine()->getRepository(Order::class);
        $products = $repo->findAll();
        return $this->json($products,200,['Access-Control-Allow-Origin'=> 'http://localhost:4200'],['groups' => 'order:readAll']);
    }


    /**
     * @Route("/api/order/{id}", name="api_order",methods={"GET"})
     */
    public function singleOrder($id)
    {
        $repo = $this->getDoctrine()->getRepository(Order::class);
        $products = $repo->find($id);
        return $this->json($products,200,['Access-Control-Allow-Origin'=> 'http://localhost:4200'],['groups' => 'order:readOne']);
    }
}
