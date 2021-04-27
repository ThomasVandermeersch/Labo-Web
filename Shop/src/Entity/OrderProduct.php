<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\OrderProductRepository;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=OrderProductRepository::class)
 */
class OrderProduct
{

    /**
     * @ORM\Column(type="integer")
     * @Groups("order:readOne")

     */
    private $number;

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity=Order::class, inversedBy="orderProducts")
     * @ORM\JoinColumn(nullable=false)
     */
    private $orderID;

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity=Product::class, inversedBy="orderProducts")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("order:readOne")

     */
    private $productID;


    public function getNumber(): ?int
    {
        return $this->number;
    }

    public function setNumber(int $number): self
    {
        $this->number = $number;

        return $this;
    }

    public function getOrderID(): ?Order
    {
        return $this->orderID;
    }

    public function setOrderID(?Order $orderID): self
    {
        $this->orderID = $orderID;

        return $this;
    }

    public function getProductID(): ?Product
    {
        return $this->productID;
    }

    public function setProductID(?Product $productID): self
    {
        $this->productID = $productID;

        return $this;
    }
}
