<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    /**
     * @Route("/admin/{code}", name="admin")
     */
    public function index($code): Response
    {
        if($code=="super"){
            return $this->render('admin/index.html.twig', [
                'controller_name' => 'AdminController',
            ]);
        }
        else{
            return $this->redirectToRoute('product', [
                'controller_name' => 'AdminController',
            ]);

        }


    }
}
