function setbBackground(e)
{
    if (e.type == "focus")   
    {
        e.target.style.borderColor = "white"; //#E6DAB0
    }
    else if (e.type == "blur")
    {
        e.target.style.borderColor = "#E6DAB0";
    }
}

document.addEventListener("DOMContentLoaded", function()
{
    const resetBttn = document.getElementById("resetForm");
    const submitBttn = document.getElementById("submitForm");
    
    {
        const cssSelector = "input[type=text],input[type=password],input[type=tel],select";
        const fields = document.querySelectorAll(cssSelector);

        for (let field of fields)
        {
            field.addEventListener("focus", setbBackground);
            field.addEventListener("blur", setbBackground);
        }
    }

    document.getElementById("FormData").addEventListener("submit", function(e)
    {
        const cssSelector = "input[type=text],input[type=password],input[type=tel]";
        const fields = document.querySelectorAll(cssSelector);

        for (let field of fields)
        {
            field.classList.remove("errorField");
        }


        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const phoneNumber = document.getElementById("phoneNumber");
        const email = document.getElementById("email");
        const password = document.getElementById("password");

        function capitalizeEachWord(toFix)
        {
            return toFix.charAt(0).toUpperCase() + toFix.slice(1);
        }

        function errorPair(element, message)
        {
            this.element = element;
            this.message = message;
        }

        let errorFields = [];

        if (firstName.value == "")
            errorFields.push(new errorPair(firstName, "<h4>First name cannot be left blank.</h4>"));
        else
            firstName.value = capitalizeEachWord(firstName.value);
        
        if (lastName.value == "")
            errorFields.push(new errorPair(lastName, "<h4>Last name cannot be left blank.</h4>"));
        else
            lastName.value = capitalizeEachWord(lastName.value);

        //Acceptable form of the phone number are ##########, (###)-###-####, and ###-###-####.
        {
            const phoneNumberVal = phoneNumber.value;
            function errorChar(strToProces)
            {
                for (let item in strToProces)
                {
                    if (item != '(' && item != ')' && item != '-' && !("123456789".includes(item)))
                        return false;
                }
            }

            switch (phoneNumberVal.length)
            {
                case 10:
                    if (errorChar(phoneNumberVal))
                        errorFields.push(new errorPair(phoneNumber, "<h4>The phone number can only contain numbers.</h4>"));

                    //No cases were found so phone number is valid.
                    break;
                case 12:
                case 14:
                {
                    const splits = phoneNumberVal.split("-");
                    const firstElem = splits.length != 3 ? null : splits[0];
                    const longFormat = phoneNumberVal.length == 14 ? true : false;
                    if (splits.length != 3)
                        errorFields.push(new errorPair(phoneNumber), "<h4>The phone number cannot contain more than 2 \'-\'.</h4>");
                    else if ((longFormat ? 
                                    firstElem.length != 5 || (firstElem[0] != '(' && firstElem[firstElem.length-1] != ')') :
                                    firstElem.length != 3)
                                || splits[1].length != 3 
                                || splits[2].length != 4)
                        errorFields.push(new errorPair(phoneNumber, "<h4>The phone number is not of valid format.</h4>"));
                    else
                    {
                        for (let item in splits)
                        {
                            if (errorChar(item))
                                errorFields.add(new errorPair(phoneNumber), "<h4>The phone number can only contain numbers.</h4>");
                        }
                    }

                    phoneNumber.value = (longFormat ? firstElem.substring(1, 4) : firstElem) + splits[1] + splits[2];
                    //No cases were found so phone number is valid.
                    break;
                }
                case 0:
                    errorFields.push(new errorPair(phoneNumber, "<h4>The phone number cannot be blank.</h4>"));
                default:
                    errorFields.push(new errorPair(phoneNumber, "<h4>The phone number must be either ##########, ###-###-####, (###)-###-####.</h4>"));
                    break;
            }
        }

        //Email must contain a "@", "." & at least one character before and after the "@", as well as a minimum of 2 characters after the ".".
        {
            const emailVal = email.value;
            const splitByAt = emailVal.split("@");
            const splitByPeriod = emailVal.split(".");

            if (emailVal.length == 0)
                errorFields.push(new errorPair(email, "<h4>The email cannot be left blank.</h4>"));
            else if (splitByAt.length != 2 || splitByPeriod.length != 2)
                errorFields.push(new errorPair(email, "<h4>The email address provided was not valid.</h4>"));
            else
            {
                //First check to see if there is at minimum 1 char before and after the @
                splitByAt[0].trim();
                splitByAt[1].trim();

                splitByPeriod[0].trim();
                splitByPeriod[1].trim();

                if (splitByAt[0].length < 1 || (splitByAt[1].length < 1 && splitByAt[1][0] != '.'))
                    errorFields.push(new errorPair(email, "<h4>The email must have at least one character before and after the \'@\'.</h4>"));
                else if ((splitByPeriod[0].length < 1 && splitByPeriod[0][0] != '@') || splitByPeriod[1].length < 2)
                    errorFields.push(new errorPair(email, "<h4>The email must have at least one character before the \'.\' and two characters after it.</h4>"));
            }

            //The email is considered to be valid.
                
        }

        //Password check
        {
            const passwordVal = password.value;
            passwordVal.trim();
            if (passwordVal.length < 6)
                errorFields.push(new errorPair(password, "<h4>The password must have at least 6 characters, including a number and a letter.</h4>"));
            else if (passwordVal.length > 9)
                errorFields.push(new errorPair(password, "<h4>The password cannot contain more than 9 characters.</h4>"));
            else
            {
                const compareString = "abcdefghijklmnopqrstuvwxyz"
                const numString = "1234567890";
                const speCharString = "@!#$%^&*()~`.,/\\?{}[];:\'\"";
                let NumFound = false;
                let SpeCharFound = false;
                for (let passChar of passwordVal)
                {
                    passChar = passChar.toLowerCase();
                    if (compareString.includes(passChar))
                    {
                        //really do nothing
                    }
                    else if (numString.includes( passChar))
                        NumFound = true;
                    else if (speCharString.includes( passChar))
                        SpeCharFound = true;
                    else
                    {
                        errorFields.push(new errorPair(password, `The character \"${ passChar}\" was not recognized.`));
                        break;
                    }

                    if (NumFound || SpeCharFound)
                        break;
                }

                if (!NumFound && !SpeCharFound)
                    errorFields.push(new errorPair(password, "<h4>The password must contain either a number or a special character.</h4>"));
            }

            //Since the password was trimmed it needs to be reset.
            password.value = passwordVal;
        }

        if (errorFields.length > 0)
        {
            let ErrorMessage = "<h2>Please correct the following issues:</h2>\n";
            for (let error of errorFields)
            {
                e.preventDefault();
                error.element.classList.add("errorField");
                ErrorMessage += "<p>    " + error.message + "</p>\n";
            }

            const errorOutput = document.getElementById("errorOutput");
            if (errorOutput)
            {
                errorOutput.innerHTML = ErrorMessage;
                errorOutput.classList.remove("hidden-elem");
                errorOutput.classList.add("visible-elem")                    
            }

            return false;
        }
        else
        {
            alert("Thank you for your subscription!");
            return true;
        }
    });

    if (resetBttn)
    {
        resetBttn.addEventListener("click", function()
        {
            const cssSelector = "input[type=text],input[type=password],input[type=tel]";
            const fields = document.querySelectorAll(cssSelector);

            for (let field of fields)
            {
                field.value = "";
                field.classList.remove("errorField");
            }

            const radioButtons = document.getElementsByName("subStatus");
            if (radioButtons && radioButtons.length >= 1)
            {
                for (let radiobttn of radioButtons)
                    radiobttn.checked = false;
                radioButtons[0].checked = true;
            }

            const errorOutput = document.getElementById("errorOutput");
            if (errorOutput)
            {
                errorOutput.classList.remove("visible-elem");
                errorOutput.classList.add("hidden-elem");         
                errorOutput.innerHTML = "";       
            }
        });
    }
});