document.addEventListener("DOMContentLoaded", function()
{
    const submitBttn = document.getElementById("submitForm");
    const resetBttn = document.getElementById("resetForm");

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const phoneNumber = document.getElementById("phoneNumber");
    const email = document.getElementById("password");

    function findSubscription()
    {
        const radioButtons = document.getElementsByName("subStatus");
        if (!radioButtons || radioButtons.length == 0)
            return null;

        for (let bttn of radioButtons)
        {
            if (bttn.checked == true)
                return bttn.innerText;
        }

        return null;
    }

    function capitalizeEachWord(toFix)
    {
        return toFix.charAt(0).toUpperCase() + toFix.slice(1);
    }

    if (submitBttn)
    {
        submitBttn.addEventListener("click", function()
        {
            function errorPair(element, message)
            {
                this.element = element;
                this.message = message;
            }

            let errorFields = [];

            if (firstName.value == "")
                errorFields.push(new errorPair(firstName, "First name cannot be left blank."));
            else
                firstName.value = capitalizeEachWord(firstName.value);
            
            if (lastName.value == "")
                errorFields.push(new errorPair(lastName, "Last name cannot be left blank."));
            else
                lastName.value = capitalizeEachWord(lastName.value);

            if (errorFields.length > 0)
            {
                let ErrorMessage = "Please Correct the following issues: ";
                for (let error of errorFields)
                {
                    error.element.classList.add("errorField");
                    ErrorMessage += "\n" + error.message;
                }

                
            }
        });
    }

    if (resetBttn)
    {
        resetBttn.addEventListener("click", function()
        {
            firstName.value = "";
            lastName.value = "";
            phoneNumber.value = "";
            email.value = "";

            const radioButtons = document.getElementsByName("subStatus");
            if (radioButtons && radioButtons.length >= 1)
            {
                for (let radiobttn of radioButtons)
                    radiobttn.checked = false;
                radioButtons[0].checked = true;
            }
        });
    }
});