<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\DBAL\Driver\PDOException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class ApiProductController extends AbstractController
{
    /**
     * @Route("/api/product", name="api_product",methods={"GET"})
     */
    public function index()
    {
        // Return all products
        $repo = $this->getDoctrine()->getRepository(Product::class);
        $products = $repo->findAll();
        return $this->json($products,200,['Access-Control-Allow-Origin'=> '*'],['groups' => 'product:read']);
    }
    
    /**
     * @Route("/api/product/new", name="api_product_new",methods={"POST","OPTIONS"})
     */
    public function newProduct(Request $request, SerializerInterface $serializer, EntityManagerInterface $em,
    ValidatorInterface $validator)
    {
        if ($request->isMethod('OPTIONS')) {
            return $this->json([], 200, ["Access-Control-Allow-Origin" => "*", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"]);
        }

        try{
            $json = $request->getContent();
            $product = $serializer->deserialize($json, Product:: class, 'json');
            
            // Verify product data is valid
            $errors = $validator->validate($product);
            if(count($errors)>0){
                return $this->json($errors, 400,["Access-Control-Allow-Origin" => "http://localhost:4200", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"],['groups'=>'product:read']);
            }

            // If valid, add product to the database
            
            $em->persist($product);
            $em->flush();
            return $this->json($product,201,["Access-Control-Allow-Origin" => "http://localhost:4200", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"],['groups'=>'product:read']);
        
        } catch(NotEncodableValueException $e){
            return $this->json([
                'status'=>400 ,
                'message'=> $e->getMessage()
            ], 400, ["Access-Control-Allow-Origin" => "http://localhost:4200", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"],['groups'=>'product:read']);
        }
    }


    /**
     * @Route("/api/product/remove/{id}", name="api_product_remove",methods={"DELETE","OPTIONS"})
     */
    public function deleteProduct(Product $product, Request $request, EntityManagerInterface $em){
        if ($request->isMethod('OPTIONS')) {
            return $this->json([], 200, ["Access-Control-Allow-Origin" => "http://localhost:4200", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"]);
        }
        try{
            //Remove product from the database
            $em->remove($product);
            $em->flush();
            return $this->json('{"status":"Removed succesfull"}',201,["Access-Control-Allow-Origin" => "http://localhost:4200", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"],['groups'=>'product:read']);

        } catch(\Exception $e){
           return $this->json($e,400,["Access-Control-Allow-Origin" => "http://localhost:4200", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"],['groups'=>'product:read']);

        }
    }

    /**
     * @Route("/api/product/modify/{id}", name="api_product_modify",methods={"PUT","OPTIONS"})
     */
    public function modifyProduct(Product $product, Request $request, EntityManagerInterface $em){
        if ($request->isMethod('OPTIONS')) {
            return $this->json([], 200, ["Access-Control-Allow-Origin" => "*", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"]);
        }
        try{
            $json = $request->getContent();
            $modifiedProduct = json_decode($json);

            // Modify product data
            $product->setPrice($modifiedProduct->price);
            $product->setDescription($modifiedProduct->description);
            $product->setName($modifiedProduct->name);

            $em->persist($product);
            $em->flush();
            return $this->json($product,201,["Access-Control-Allow-Origin" => "*", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"],['groups'=>'product:read']);

        } catch(\Exception $e){
           return $this->json($e,400,["Access-Control-Allow-Origin" => "*", "Access-Control-Allow-Headers" => "*", "Access-Control-Allow-Methods" => "*"],['groups'=>'product:read']);
        }
   }
}
