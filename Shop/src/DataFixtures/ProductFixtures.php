<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Product;


class ProductFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $product = new Product();
        $product->setName("Tomates");
        $product->setPrice(20.20);
        $product->setUrl("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.kfc.fr%2Ftomates.html&psig=AOvVaw0S65LBOIW7w36wom9IGXTt&ust=1613333738977000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKDIwtfW5-4CFQAAAAAdAAAAABAD");
        
        $product2 = new Product();
        $product2->setName("Chips");
        $product2->setPrice(10);
        $product2->setUrl("...");
        
        $product3 = new Product();
        $product3->setName("Pâtes");
        $product3->setPrice(2.05);
        $product3->setUrl("...");
        
        $manager->persist($product);
        $manager->persist($product2);
        $manager->persist($product3);


        $manager->flush();
    }
}
