"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, X, ShoppingCart } from "lucide-react";

interface CartSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle className="font-headline text-2xl">Shopping Cart</SheetTitle>
        </SheetHeader>
        <Separator />
        {cart.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-6 p-6 pr-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-md">
                        <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                        <div className="mt-2 flex items-center">
                           <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                               <Minus className="h-3 w-3" />
                           </Button>
                           <Input type="number" value={item.quantity} readOnly className="h-7 w-12 text-center mx-1"/>
                           <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                               <Plus className="h-3 w-3" />
                           </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-7 w-7" onClick={() => removeFromCart(item.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="p-6 bg-secondary/50">
              <div className="w-full space-y-4">
                <div className="flex justify-between font-semibold">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
                <SheetClose asChild>
                    <Button asChild className="w-full">
                        <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                </SheetClose>
                <Button variant="outline" className="w-full" onClick={clearCart}>Clear Cart</Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center p-6">
            <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground"/>
            </div>
            <h3 className="font-semibold text-xl">Your cart is empty</h3>
            <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <SheetClose asChild>
                <Button>Continue Shopping</Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
