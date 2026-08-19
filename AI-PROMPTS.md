# AI Development Prompts

This file records the prompts used with AI during development of the e-commerce application.

## Prompt 1 — Application Foundation

Build the foundation of this React e-commerce application.

Before making changes, inspect the existing React/Vite project structure and explain your implementation plan.

Create a clean, responsive e-commerce storefront with:

- A header/navigation area
- A hero section
- A product catalogue using local mock product data
- Product cards showing image, name, price, category, and an Add to Cart button
- A simple cart count in the header
- Responsive behavior for desktop, tablet, and mobile
- Reusable React components rather than putting everything in App.jsx
- Clear separation between product data and UI components
- Accessible semantic HTML and meaningful button labels
- No unnecessary dependencies

Keep the implementation appropriate for a beginner/intermediate React capstone project.

After implementing it:
1. Run the application and verify that it builds.
2. Check for obvious console errors.
3. Summarize the files you created or changed and explain the main implementation decisions.

### Result

Codex created the storefront foundation with reusable React components, local product data, responsive CSS, cart-count state, and passed build/lint verification.

## Prompt 2

To be added.

## Prompt 3

To be added.

## Prompt 4

To be added.

### Manual Improvement 1 — Broken Product Image

During manual testing, one product card displayed its alt text instead of an image because its external image URL was unavailable. I traced the issue to the product image source and added an image error handler in `ProductCard.jsx`. The handler replaces a failed image with an “Image unavailable” fallback, preventing the browser from displaying the alt text as the visible image content while preserving the alt text for accessibility.

### Manual Improvement 2 — Functional Shopping Cart

During review, I found that the AI-generated cart only tracked a numeric count, while the bag button was not useful for viewing cart contents. I refactored the cart state in `App.jsx` to store the actual product objects, connected the bag button to the cart panel, and displayed the products added by the user.

I also found that `ProductCard.jsx` was calling `onAddToCart` without passing the selected product. I corrected the event handler so that the actual product object is passed to the cart state. This allowed the cart to display the correct products and keep the cart count synchronized with its contents.

### Manual Improvement 3 — Removing Cart Items

The initial cart allowed products to be added but provided no way to remove them. I added a Remove action for each cart item and updated the cart state so that removing an item also decreases the cart count. This gives users control over their selections and makes the basic shopping cart interaction more complete.
