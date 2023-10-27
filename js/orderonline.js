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
    //Updates the style of the cards that match the Name parameter, by grabbing the value of the h3 in each card. When InCart is true, it will remove styles, while if it is false, it will add the styles.
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
                    SubmitButton.setAttribute('value', "Add To Cart");
                }
                else
                {
                    Card.classList.add("OrderSelect");
                    SubmitButton.setAttribute('value', "Remove From Cart");
                }
            }
        }
    }
    // Occurs when a "Add To Cart" button is pressed. This will either add or remove that item from carItems, and then style each of the matching cards by calling selectAllCardsOfName(). Then it updates the storage.
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

    // Updates the sessionStorage for this webpage to the current cart items.
    function updateStorage()
    {
        sessionStorage.setItem('cartitems', JSON.stringify(cartItems));
    }
    // Grabs the sessionStorage data.
    function retrieveStorage()
    {
        return JSON.parse(sessionStorage.getItem('cartitems')) || [];
    }
    // Clears all data & resets styles.
    function removeStorage()
    {
        sessionStorage.removeItem('cartitems');
        cartItems = [];
        resetCardStyles();
    }

    // Links the reset cart button to remove the storage.
    const ResetCart = document.querySelector("#ResetCart");
    ResetCart.addEventListener("click", removeStorage);

    // Links the buttons for addtocart to the event that will select all matching cards.
    for (let e of AddToCartBttns)
    {
        e.addEventListener('click', toggleCartItem);
    }

    // Sets up basic document & data.
    // Grabs the data from the sessionStorage, and then updates each card that is already in cartItems to be styled correctly.

    cartItems = retrieveStorage();
    for (let cartItem of cartItems)
        selectAllCardsOfName(cartItem, false);
});