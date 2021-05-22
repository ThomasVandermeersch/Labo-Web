<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class AdminController extends AbstractController
{
    /**
     * @Route("/admin/logout", name="log_out")
     */
    public function logOut(SessionInterface $session): Response
    {
        // Change of the user status
        $session->set('user', 'normal');
        return $this->redirectToRoute('order');
    }

    /**
     * @Route("/admin/login/{code}", name="admin")
     */
    public function index($code, SessionInterface $session): Response
    {
        // Check if password is correct
        if($code=="super"){
            $session->set('user','admin');
            
            return $this->render('admin/index.html.twig', [
                'controller_name' => 'AdminController',
            ]);
        }
        // If password is incorect, user does not have acces to the Admin routes
        else{
            return $this->redirectToRoute('product', [
                'controller_name' => 'AdminController',
            ]);
        }
    }
}