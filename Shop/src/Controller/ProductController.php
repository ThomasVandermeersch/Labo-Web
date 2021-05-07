<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Product;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Form\ProductType;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class ProductController extends AbstractController
{
    /**
     * @Route("/", name="homePage")
     * @Route("/product", name="product")
     */
    public function index(SessionInterface $session): Response
    // This function gets and render all products
    {
        try{
            $repo = $this->getDoctrine()->getRepository(Product::class);
            $products = $repo->findAll();
            $user = $session->get('user', '');

            return $this->render('product/index.html.twig', [
                'controller_name' => 'ProductController',
                'products' => $products,
                'user'=> $user
            ]);
        } 
        catch(\Exception $e){
            return $this->render('product/error.html.twig',['error'=> "Something went wrong with the database"]);
        }
    }

    /**
    * @Route("/product/create",name="new_product")
    * @Route("/product/modify/{id}", name="modify_product")
    */
    public function newProduct(Product $product = null, Request $request,EntityManagerInterface $manager, SessionInterface $session)
    {
        // Check if the user has acces to this page
        $user = $session->get('user', '');
        if($user != 'admin') return $this->redirectToRoute("product");
        
        // Continue if access


        if(! $product) $product = new Product();
        
        $form = $this->createForm(ProductType::class,$product);
        $form->handleRequest($request);
        dump($product);
        
        if($form->isSubmitted() && $form->isValid()){
            $manager->persist($product);
            $manager->flush();
            return $this->redirectToRoute("product");
        }

        return $this->render('product/newProduct.html.twig', [
            'formProduct' => $form->createView()
        ]);

    }

    /**
    * @Route("/product/remove/{id}",name="remove_product")
    */
    public function removeProduct(Product $product, EntityManagerInterface $em,  SessionInterface $session){
        $user = $session->get('user', '');
        if($user != 'admin') return $this->redirectToRoute("product");
        
        $em->remove($product);
        $em->flush();
        return $this->redirectToRoute("product");
    }
}