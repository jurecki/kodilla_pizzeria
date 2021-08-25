/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');

  const select = {
    templateOf: {
      menuProduct: '#template-menu-product',
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9,
    },
  };

  const templates = {
    menuProduct: Handlebars.compile(
      document.querySelector(select.templateOf.menuProduct).innerHTML
    ),
  };

  class Product {
    constructor(id, data) {
      const thisProduct = this;
      thisProduct.id = id;
      thisProduct.data = data;

      thisProduct.renderInMenu();
      thisProduct.getElements();
      thisProduct.initAccordion();
      thisProduct.initOrderForm();
      thisProduct.processOrder();
      // console.log('new Product', thisProduct);
    }

    renderInMenu() {
      const thisProduct = this;

      //generate HTML based on template
      const generateHTML = templates.menuProduct(thisProduct.data);
      //create element using utils.createElementFromHTML
      thisProduct.element = utils.createDOMFromHTML(generateHTML);
      //find menu container
      const menuContainer = document.querySelector(select.containerOf.menu);
      //add element to menu
      menuContainer.appendChild(thisProduct.element);
    }

    getElements() {
      const thisProduct = this;

      thisProduct.accordionTrigger = thisProduct.element.querySelector(
        select.menuProduct.clickable
      );
      thisProduct.form = thisProduct.element.querySelector(
        select.menuProduct.form
      );
      thisProduct.formInputs = thisProduct.form.querySelectorAll(
        select.all.formInputs
      );
      thisProduct.cartButton = thisProduct.element.querySelector(
        select.menuProduct.cartButton
      );
      thisProduct.priceElem = thisProduct.element.querySelector(
        select.menuProduct.priceElem
      );
    }

    initAccordion() {
      const thisProduct = this;

      //find the clickable trigger (the element that should react to clicking)

      // START: click event listener to trigger
      thisProduct.accordionTrigger.addEventListener('click', function (e) {
        //prevent default action for event
        e.preventDefault();
        //toogle active class on element of thisProduct
        thisProduct.element.classList.toggle(
          classNames.menuProduct.wrapperActive
        );
        /* find all active products */
        const activeProducts = document.querySelectorAll('.product.active');
        /* START LOOP: for each active product */
        for (let activeProduct of activeProducts) {
          /* START: if the active product isn't the element of thisProduct */
          if (activeProduct !== thisProduct.element) {
            activeProduct.classList.remove(
              classNames.menuProduct.wrapperActive
            );
            /* END: if the active product isn't the element of thisProduct */
          }
          /* END LOOP: for each active product */
        }
        /* END: click event listener to trigger */
      });
    }
    initOrderForm() {
      const thisProduct = this;

      thisProduct.form.addEventListener('submit', function (event) {
        event.preventDefault();
        thisProduct.processOrder();
      });

      for (let input of thisProduct.formInputs) {
        input.addEventListener('change', function () {
          thisProduct.processOrder();
        });
      }

      thisProduct.cartButton.addEventListener('click', function (event) {
        event.preventDefault();
        thisProduct.processOrder();
      });
    }
    processOrder() {
      const thisProduct = this;
      const formData = utils.serializeFormToObject(thisProduct.form);
      console.log('formData', formData);

      //create variable price, get defualt price
      let price = thisProduct.data.price;

      /* START LOOP: for each pramId in thisProduct.data.param */
      for (let paramId in thisProduct.data.params) {
        /* save the element in thisProduct.data.params with key paramId as const param */
        const param = thisProduct.data.params[paramId];
        console.log('param', param.options);

        /* START LOOP for each optionID  in param.options */
        for (let optionID in param.options) {
          /* save the element in param.options with key options */
          const option = param.options[optionID];
          console.log('label', option.label);
          console.log('price', option.price);
        }
      }

      // if option is checked and is not default increase product price
      // if option is not checked and is default decrease product price
      //end loop
      // end loop
      //change price of element
    }
  }

  const app = {
    initMenu: function () {
      const thisApp = this;
      console.log('thisApp.data', thisApp.data);
    },

    initData: function () {
      const thisApp = this;
      thisApp.data = dataSource;

      for (let productData in thisApp.data.products) {
        new Product(productData, thisApp.data.products[productData]);
      }
    },

    init: function () {
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);

      thisApp.initData();
      thisApp.initMenu();
    },
  };

  app.init();
}
