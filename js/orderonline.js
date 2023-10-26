document.addEventListener('DOMContentLoaded', function()
{
    let cartItems = [];

    const CartCards = document.querySelectorAll(".card")
    const AddToCartBttns = document.querySelectorAll(".addToCartBttn");

    function resetCardStyles()
    {
        if (CartCards)
        {
            CartCards.forEach( e => 
                {
                    e.classList.remove("OrderSelect")
                });
        }
    }
    function selectAllCardsOfName(Name, InCart)
    {
        const FilteredCards = Array.from(CartCards).filter( a =>
            {
                //See if the H3 tag matches the target name
                const headerTag = a.querySelector("h3");
                if (headerTag)
                    return headerTag.innerText == Name;
                else
                    return false;
            });
        
        if (FilteredCards)
        {
            for (let Card of FilteredCards)
            {
                const SubmitButton = Card.querySelector(".addToCartBttn");
                if (InCart)
                {
                    Card.classList.remove("OrderSelect");
                    SubmitButton.value = "Add To Cart";
                }
                else
                {
                    Card.classList.add("OrderSelect");
                    SubmitButton.Value = "Remove From Cart";
                }
            }
        }
    }
    function toggleCartItem(e)
    {
        const Target = e.target;
        const TargetsParent = Target.parentElement;

        const hTags = TargetsParent.querySelector("h3");
        if (!hTags)
        {
            alert("The header tag was not found.");
            return;
        }

        const ShoeText = hTags.innerText;
        const IsInCart = cartItems.includes(ShoeText);

        if (IsInCart)
            cartItems.splice(cartItems.findIndex( item => item == ShoeText), 1);
        else
            cartItems.push(ShoeText);

        selectAllCardsOfName(ShoeText, IsInCart);

        updateStorage();
    }

    function updateStorage()
    {
        sessionStorage.setItem('cartitems', JSON.stringify(cartItems));
    }
    function retrieveStorage()
    {
        return JSON.parse(sessionStorage.getItem('cartitems')) || [];
    }
    function removeStorage()
    {
        sessionStorage.removeItem('cartitems');
        cartItems = [];
        resetCardStyles();
    }

    const ResetCart = document.querySelector("#ResetCart");
    ResetCart.addEventListener("click", removeStorage);

    for (let e of AddToCartBttns)
    {
        e.addEventListener('click', toggleCartItem);
    }

    cartItems = retrieveStorage();
    console.log(cartItems);
    resetCardStyles();
    for (let cartItem of cartItems)
    {
        selectAllCardsOfName(cartItem, false);
    }
});