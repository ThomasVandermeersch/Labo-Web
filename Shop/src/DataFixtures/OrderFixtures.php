<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Order;

class OrderFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $order = new Order();
        $order-> setTotalPrice(200);
        $order-> setCustomerName("Jean");
        $order-> setCreatedAt(new \DateTime());

        $manager->persist($order);
        $manager->flush();
    }
}
