var evenBus = new Vue()

var product = Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="content">
        <div class="product">
        <div class="product-image">
            <img :src="image" />
        </div>
        <div class="product-info">
            <h1>{{title}}</h1>
            <p v-if="inventory>10">In Stock</p>
            <p v-else-if="inventory <=10 && inventory>0">Almost sold out </p>
            <p v-else :class="lineTh">Out of Stock</p>
            <p v-if="onSale">On Sale</p>
            <button v-show="showMore">Show More</button>
            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>
            <div class="optional">
                <!-- <div v-for="variant in variants"
                    :key="variant.variantId" class="color-box"
                    :class="{active:activeClass,'text-danger':errorClass}"
                    :style="{background:variant.variantColor}"
                    @mouseover="updateProduct(variant.variantImage)">
                    <p >{{variant.variantColor}}</p>
                </div> -->
                <div v-for="(variant,index) in variants"
                    :key="variant.variantId" class="color-box"
                    :class="{active:activeClass}"
                    :style="{background:variant.variantColor}"
                    @mouseover="updateProduct(index)">
                    <!-- <p >{{variant.variantColor}}</p> -->
                </div>
            </div>
            <div class="cart-component">
                <div class="card-actions">
                    <button class="btn" v-on:click="addItem"
                            :disabled="!inStock"
                            :class="{disableButton:!inStock}">+</button>
                    <br>
                    <button class="btn" v-on:click="removeItem"
                            :disabled="!inStock"
                            :class="{disableButton:!inStock}">-</button>
                </div>
                <div class="number">
                    <p>Number({{number}})</p>
                </div>
                <button v-on:click="addToCart">Add to card</button>
                <button v-on:click="removeOutOfCart">Remove out of card</button>
            </div>
        </div>
        </div>
        <product-tabs :reviews="reviews"></product-tabs>
    </div>
     `,
    data() {
        return {
            brand: "Vue Mastery",
            product: 'Socks',
            //image: "./images/socks.jpg",
            inStock: true,
            //inventory: 3,
            onSale: true,
            showMore: false,
            details: ["80% cotton",
                "20% polyester",
                "Gender-neutral",],
            variants: [
                {
                    variantId: 123,
                    variantColor: "red",
                    variantImage: './images/sock1.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 234,
                    variantColor: "orange",
                    variantImage: './images/socks.jpg',
                    variantQuantity: 20
                }],
            number: 0,
            activeClass: 'active',
            errorClass: 'text-danger',
            isActive: true,
            disableButton: 'disableButton',
            lineTh: 'line-th',
            // classobject:{
            //     active:true,
            //     'text-dander':false
            // }
            selectedVariant: 0,
            reviews: []
        }
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeOutOfCart: function () {
            this.$emit('remove-outof-cart', this.variants[this.selectedVariant].variantId)
        },
        addItem: function () {
            if (this.number < this.variants[this.selectedVariant].variantQuantity) {
                this.number += 1;
            }
        },
        removeItem: function () {
            if (this.number > 0) {
                this.number -= 1;
            }
        },
        // updateProduct:function(variantImage){
        //     this.image=variantImage
        // }, 
        updateProduct: function (index) {
            this.selectedVariant = index
        },
        // addReview(productReview){
        //     this.reviews.push(productReview)
        // },

    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inventory() {
            this.number = 0
            return this.variants[this.selectedVariant].variantQuantity
        },

    },
    mounted() {
        evenBus.$on('review-submitted', productReview => {
            console.log("Name= " + productReview.name)
            this.reviews.push(productReview)
        })
    }
})
Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p class="error" v-if="errors.length">
            <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
        </p>
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" required>
        </p>
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review" required></textarea>
        </p>
        <p>
            <label for="rating">Rating:</label> 
            <select id="rating" v-model="rating" required>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        <p>
            <input v-on-click="onSubmit" type="submit" value="Submit">
        </p>
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = []
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                console.log(productReview.name)
                evenBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            } else {
                //   if(!this.name) this.errors.push("Name required.")
                //   if(!this.review) this.errors.push("Review required.")
                //   if(!this.rating) this.errors.push("Rating required.")
            }
        }
    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
    <div>
        <div>
            <span class="tabs"
                :class="{activeTab: selectedTab===tab}"
                v-for="(tab,index) in tabs"
                :key="index"
                @click="selectedTab = tab">{{tab}}</span>
        </div>
        <div v-show="selectedTab==='Reviews'" class="show">
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul v-else>
                <li v-for="review in reviews" class="show">
                    <p>{{review.name}}</p>
                    <p>Rating: {{review.rating}}</p>
                    <p>{{review.review}}</p>
                </li>
            </ul>
        </div>
        <div v-show="selectedTab==='Make a Review'">
            <product-review></product-review>
        </div>
    </div>
    `,
    data() {
        return {
            tabs: ['Reviews', "Make a Review"],
            selectedTab: 'Review',
            activeTab: 'activeTab'
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        carts: [],
    },
    methods: {
        updateCart(id) {
            this.carts.push(id)
        },
        removeOOCart(id) {
            this.carts.pop(id)
        }
    }

})