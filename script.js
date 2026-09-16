/* =========================================
   CONFIG
   Change the WhatsApp number here only.
   Use country code, no + or spaces.
========================================= */

const WHATSAPP_NUMBER = "971558311047";
const CONTACT_EMAIL = "hakimwebsites.ug@gmail.com";


/* =========================================
   START THE PAGE
========================================= */

setupMobileNav();
setupSmoothScrolling();
setupProjectFilters();
setupServicePrefill();
setupWhatsAppLinks();
setupContactForm();


/* =========================================
   MOBILE NAVIGATION
========================================= */

function setupMobileNav() {

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    if (!menuButton || !navLinks) {
        return;
    }

    function closeMenu() {
        navLinks.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
    }

    function openMenu() {
        navLinks.classList.add("active");
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Close menu");
    }

    menuButton.addEventListener("click", function () {

        const isOpen = navLinks.classList.contains("active");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });

    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

}


/* =========================================
   SMOOTH ANCHOR SCROLLING
========================================= */

function setupSmoothScrolling() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.getElementById(targetId.slice(1));

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* =========================================
   PROJECT FILTERING
========================================= */

function setupProjectFilters() {

    const buttons = document.querySelectorAll(".filter-button");
    const projects = document.querySelectorAll(".project");
    const emptyMessage = document.getElementById("filterEmpty");

    if (!buttons.length || !projects.length) {
        return;
    }

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedFilter =
                button.getAttribute("data-filter");

            showFilteredProjects(
                selectedFilter,
                buttons,
                projects,
                emptyMessage
            );

        });

    });

}


function showFilteredProjects(
    selectedFilter,
    buttons,
    projects,
    emptyMessage
) {

    buttons.forEach(function (button) {

        const isActive =
            button.getAttribute("data-filter") === selectedFilter;

        button.classList.toggle("is-active", isActive);

        button.setAttribute(
            "aria-pressed",
            isActive ? "true" : "false"
        );

    });

    let visibleCount = 0;

    projects.forEach(function (project) {

        const category =
            project.getAttribute("data-category");

        const shouldShow =
            selectedFilter === "all" ||
            category === selectedFilter;

        project.hidden = !shouldShow;

        if (shouldShow) {
            visibleCount += 1;
        }

    });

    if (emptyMessage) {
        emptyMessage.hidden = visibleCount > 0;
    }

}


/* =========================================
   SERVICE CARDS PREFILL THE FORM
========================================= */

function setupServicePrefill() {

    const serviceLinks =
        document.querySelectorAll("[data-project-type]");

    const projectTypeSelect =
        document.getElementById("projectType");

    serviceLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const projectType =
                link.getAttribute("data-project-type");

            if (projectTypeSelect && projectType) {
                projectTypeSelect.value = projectType;
            }

        });

    });

}


/* =========================================
   WHATSAPP LINKS
========================================= */

function setupWhatsAppLinks() {

    updateWhatsAppLinks(
        getDefaultWhatsAppMessage()
    );

}


function getWhatsAppUrl(message) {

    const encodedMessage =
        encodeURIComponent(message);

    return (
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodedMessage
    );

}


function getDefaultWhatsAppMessage() {

    return (
        "Hi Hakim, I'd like to discuss a website project.\n\n" +
        "I'd like to know more about working with you."
    );

}


function buildWhatsAppMessage(formValues) {

    let message =
        "Hi Hakim, I'd like to discuss a website project.\n\n";

    message +=
        "Project type: " +
        formValues.projectType +
        "\n";

    message +=
        "Business: " +
        formValues.business +
        "\n";

    message +=
        "Name: " +
        formValues.name +
        "\n";

    message +=
        "Email: " +
        formValues.email +
        "\n";

    if (formValues.website) {

        message +=
            "Website: " +
            formValues.website +
            "\n";

    }

    message +=
        "\nProject details:\n" +
        formValues.message;

    return message;

}


function updateWhatsAppLinks(message) {

    const whatsappLinks =
        document.querySelectorAll(".js-whatsapp-link");

    const url =
        getWhatsAppUrl(message);

    whatsappLinks.forEach(function (link) {

        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

    });

}


/* =========================================
   CONTACT FORM
========================================= */

function setupContactForm() {

    const form =
        document.getElementById("contactForm");

    const successBox =
        document.getElementById("contactSuccess");

    const resetButton =
        document.getElementById("resetFormButton");

    const successEmail =
        document.getElementById("successEmail");

    const formStatus =
        document.getElementById("formStatus");

    if (!form) {
        return;
    }


    form.addEventListener("submit", function (event) {

        event.preventDefault();

        clearFormErrors(form);

        const formValues =
            getFormValues(form);

        const errors =
            validateContactForm(formValues);


        /* -----------------------------------------
           VALIDATION
        ----------------------------------------- */

        if (Object.keys(errors).length > 0) {

            showFormErrors(form, errors);

            if (formStatus) {

                formStatus.textContent =
                    "Please fix the highlighted fields.";

            }

            const firstErrorField =
                form.querySelector(
                    ".has-error input, " +
                    ".has-error select, " +
                    ".has-error textarea"
                );

            if (firstErrorField) {
                firstErrorField.focus();
            }

            return;
        }


        /* -----------------------------------------
           BUILD CONTACT LINKS
        ----------------------------------------- */

        const whatsappMessage =
            buildWhatsAppMessage(formValues);

        updateWhatsAppLinks(
            whatsappMessage
        );


        if (successEmail) {

            successEmail.href =
                buildMailtoUrl(formValues);

        }


        /* -----------------------------------------
           SHOW SUCCESS STATE
        ----------------------------------------- */

        form.hidden = true;

        if (successBox) {

            successBox.hidden = false;

            successBox.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

        if (formStatus) {
            formStatus.textContent = "";
        }

    });


    /* -----------------------------------------
       RESET FORM
    ----------------------------------------- */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            function () {

                form.reset();

                clearFormErrors(form);

                form.hidden = false;

                if (successBox) {
                    successBox.hidden = true;
                }

                updateWhatsAppLinks(
                    getDefaultWhatsAppMessage()
                );

                form.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }

}


/* =========================================
   GET FORM VALUES
========================================= */

function getFormValues(form) {

    const formData =
        new FormData(form);

    return {

        name:
            (formData.get("name") || "")
                .toString()
                .trim(),

        email:
            (formData.get("email") || "")
                .toString()
                .trim(),

        business:
            (formData.get("business") || "")
                .toString()
                .trim(),

        website:
            normaliseWebsite(
                (formData.get("website") || "")
                    .toString()
                    .trim()
            ),

        projectType:
            (formData.get("projectType") || "")
                .toString()
                .trim(),

        message:
            (formData.get("message") || "")
                .toString()
                .trim()

    };

}


/* =========================================
   VALIDATE CONTACT FORM
========================================= */

function validateContactForm(formValues) {

    const errors = {};


    if (formValues.name.length < 2) {

        errors.name =
            "Please enter your name.";

    }


    if (!isValidEmail(formValues.email)) {

        errors.email =
            "Please enter a valid email address.";

    }


    if (formValues.business.length < 2) {

        errors.business =
            "Please enter your business or company name.";

    }


    if (
        formValues.website &&
        !isValidWebsite(formValues.website)
    ) {

        errors.website =
            "Please enter a valid website address.";

    }


    if (!formValues.projectType) {

        errors.projectType =
            "Please choose a project type.";

    }


    if (formValues.message.length < 10) {

        errors.message =
            "Please add a short description of what you need.";

    }


    return errors;

}


/* =========================================
   EMAIL VALIDATION
========================================= */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


/* =========================================
   WEBSITE NORMALIZATION
========================================= */

function normaliseWebsite(website) {

    if (!website) {
        return "";
    }

    if (!/^https?:\/\//i.test(website)) {

        return "https://" + website;

    }

    return website;

}


/* =========================================
   WEBSITE VALIDATION
========================================= */

function isValidWebsite(website) {

    try {

        const url =
            new URL(website);

        return (
            url.protocol === "http:" ||
            url.protocol === "https:"
        );

    } catch (error) {

        return false;

    }

}


/* =========================================
   SHOW FORM ERRORS
========================================= */

function showFormErrors(form, errors) {

    Object.keys(errors).forEach(
        function (fieldName) {

            const field =
                form.querySelector(
                    '[name="' +
                    fieldName +
                    '"]'
                );

            const errorElement =
                document.getElementById(
                    fieldName + "-error"
                );


            if (field) {

                const wrapper =
                    field.closest(".form-field");

                if (wrapper) {

                    wrapper.classList.add(
                        "has-error"
                    );

                }

                field.setAttribute(
                    "aria-invalid",
                    "true"
                );

                if (errorElement) {

                    field.setAttribute(
                        "aria-describedby",
                        errorElement.id
                    );

                }

            }


            if (errorElement) {

                errorElement.hidden = false;

                errorElement.textContent =
                    errors[fieldName];

            }

        }
    );

}


/* =========================================
   CLEAR FORM ERRORS
========================================= */

function clearFormErrors(form) {

    const wrappers =
        form.querySelectorAll(".form-field");

    wrappers.forEach(function (wrapper) {

        wrapper.classList.remove(
            "has-error"
        );

    });


    const fields =
        form.querySelectorAll(
            "input, select, textarea"
        );

    fields.forEach(function (field) {

        field.removeAttribute(
            "aria-invalid"
        );

        field.removeAttribute(
            "aria-describedby"
        );

    });


    const errorMessages =
        form.querySelectorAll(".field-error");

    errorMessages.forEach(
        function (errorMessage) {

            errorMessage.hidden = true;

            errorMessage.textContent = "";

        }
    );

}


/* =========================================
   EMAIL LINK
========================================= */

function buildMailtoUrl(formValues) {

    const subject =
        "Website project: " +
        formValues.projectType;

    const body =
        buildWhatsAppMessage(formValues);

    return (
        "mailto:" +
        CONTACT_EMAIL +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body)
    );

}