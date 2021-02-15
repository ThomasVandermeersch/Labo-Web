<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Product;
use Symfony\Component\Form\Extension\Core\Type\TextType; 
use Symfony\Component\Form\Extension\Core\Type\TextareaType; 
use Symfony\Component\Form\Extension\Core\Type\SubmitType; 
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Form\ProductType;

class ProductController extends AbstractController
{
    /**
     * @Route("/product", name="product")
     */
    public function index(): Response
    {
        $repo = $this->getDoctrine()->getRepository(Product::class);
        $products = $repo->findAll();
        return $this->render('product/index.html.twig', [
            'controller_name' => 'ProductController',
            'products' => $products
        ]);
    }
    
    /**
    * @Route("/product/create",name="new_product")
    * @Route("/product/modify/{id}", name="modify_product")
 
    */
    public function newProduct(Product $product, Request $request,EntityManagerInterface $manager)
    {
        if(! $product){
            $product = new Product();
        }
        // $form = $this->createFormBuilder($product) //création d'un form lié à l'article.
        //             ->add('name')
        //             ->add('description')
        //             ->add('price')
        //             ->add('url')
        //             ->getForm();
        
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
}
