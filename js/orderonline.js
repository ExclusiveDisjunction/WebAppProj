document.addEventListener('DOMContentLoaded', function()
{
    let cartItems = [];

    const CartCards = document.querySelectorAll(".card")
    const AddToCartBttns = document.querySelectorAll(".addToCartBttn");
    const ButtonGridDivs = document.querySelectorAll(".ButtonGrid");
    const SelectButtons = [];

    const ImageBins = [];
    const ImageTitles = [];
    let currentColor = "black";

    for (let CartCard of CartCards)
    {
        const id = CartCard.id;
        ImageTitles.push(id);

        const ImageItem = CartCard.querySelector("img")
        if (ImageItem == null)
            continue;

        ImageBins.push(ImageItem);
        const PathStr = `img/shoeImages/${id}/${id}${currentColor}.svg`;
        console.log(PathStr);
        ImageItem.src = PathStr;
    }

    for (let Div of ButtonGridDivs)
    {
        const ThisArr = Div.querySelectorAll("button[type='button']");
        SelectButtons.push(ThisArr);
        for (let Button of ThisArr)
        {
            Button.addEventListener("click", function(e)
            {
                const target = e.target;
                for (let child of target.parentElement.children)
                {
                    child.classList.remove("ButtonSelected");
                }

                e.target.classList.add("ButtonSelected");
            });
        }
    }

    const ColorsGrid = document.querySelector("#ColorsGrid");
    if (ColorsGrid != null)
    {
        const buttons = ColorsGrid.querySelectorAll("button");
        for (let button of buttons)
        {
            button.addEventListener("click", function(e)
            {
                const target = e.target;
                currentColor = target.innerText.trim().toLowerCase();

                let i = 0
                for (let i = 0; i < ImageBins.length; i++)
                {
                    const id = ImageTitles[i];
                    ImageBins[i].src = `img/shoeImages/${id}/${id}${currentColor}.svg`;
                }
            });
        }
    }

    function resetCardStyles()
    {
        if (CartCards)
        {
            CartCards.forEach( e => 
                {
                    e.classList.remove("OrderSelect")
                    const SubmitButton = e.querySelector(".addToCartBttn");
                    SubmitButton.setAttribute('value', "Add To Cart");
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
    const SubmitCart = document.querySelector("#SubmitCart");
    ResetCart.addEventListener("click", removeStorage);
    SubmitCart.addEventListener("click", function() 
    {
        removeStorage();

        alert("Your order has been placed! Thank you for your patronage!");
    });

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