// This is a utility script. Do not link to HTML.

// Import the Firebase SDK and initialize Firebase (requires firebase to be installed locally if you want to run with node)
const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");

// Firebase data
const firebaseConfig = {
    apiKey: "AIzaSyDQMc07uA1vj6TI7iwTWdj-90ri_l5wLjs",
    authDomain: "dtc05-e0f80.firebaseapp.com",
    projectId: "dtc05-e0f80",
    storageBucket: "dtc05-e0f80.firebasestorage.app",
    messagingSenderId: "255051613314",
    appId: "1:255051613314:web:ba5e360dafa6b87b96e09b",
    measurementId: "G-10GFV7PDLZ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Get a reference to the collection (insert your collection name here)
const collectionRef = db.collection("items");

// Define the data for the documents with explicit IDs
const dataMap = {
    "00000000004087": { name: "Roma Tomatoes", price: 0.75, pricedByWeight: true },
    "00000000004070": { name: "Celery Bunch", price: 4.45, pricedByWeight: true },
    "00000000004562": { name: "Carrots", price: 0.66, pricedByWeight: true },
    "00000000004688": { name: "Bell Peppers - Red", price: 2.98, pricedByWeight: true },
    "00000000004093": { name: "Yellow Onions", price: 1.86, pricedByWeight: true },
    "00000000004082": { name: "Red Onions", price: 2.58, pricedByWeight: true },
    "00000000004072": { name: "Russet Potatoes", price: 1.9, pricedByWeight: true },
    "00000000004677": { name: "Anaheim Peppers", price: 0.25, pricedByWeight: true },
    "00777262503609": { name: "Maple Leaf - Prime Chicken Breasts, Boneless Skinless, 1 Each", price: 20.0, pricedByWeight: true },
    "00222650000005": { name: "Lilydale Boneless Skinless Thighs Value Pack, 10-14 pieces per tray, 1.06 - 1.44 kg", price: 25.89, pricedByWeight: true },
    "00221372000003": { name: "Maple Leaf Fresh Boneless Pork Chops Center and Rib End, Combo Pack 9 Pieces, 1.00 - 1.35 kg", price: 16.17, pricedByWeight: true },
    "00220510000004": { name: "Extra Lean Ground Beef, Your Fresh Market, 1 Tray, 1.20 - 1.50 kg", price: 23.97, pricedByWeight: true },
    "00220022000004": { name: "Sirloin Tip Beef Steak Value Pack, Your Fresh Market, 2-3 Steaks, AAA Angus Beef, 0.67 - 0.95 kg", price: 22.68, pricedByWeight: true },
    "00077782006575": { name: "Johnsonville Maple Breakfast Sausage Links, JVL Maple Bkfst SSG Links 375g", price: 6.47, pricedByWeight: false },
    "00063100000431": { name: "Maple Leaf Natural Top Dogs Original Hot Dogs, 375 g", price: 6.97, pricedByWeight: false },
    "00055898151921": { name: "Grimm's Sizzlin' Naturally Smoked Cheddar Smokies, 450g", price: 8.47, pricedByWeight: false },
    "00068700011016": { name: "Dairyland - 2% Milk, Partly Skimmed, 4 Litre", price: 6.25, pricedByWeight: false },
    "00068200004587": { name: "Cracker Barrel - Old Cheddar Cheese Block, 600 Gram", price: 13.69, pricedByWeight: false },
    "00068700045059": { name: "Dairyland - Butter Salted, 454 Gram", price: 8.55, pricedByWeight: false },
    "00068100011258": { name: "Philadelphia - Original Brick Cream Cheese, 250 Gram", price: 5.39, pricedByWeight: false },
    "00068700267000": { name: "Dairyland - Sour Cream 14% M.F., 500 Millilitre", price: 4.99, pricedByWeight: false },
    "00068700103612": { name: "Dairyland - Creamo Half & Half Cream, 10% M.F., 946 Millilitre", price: 4.29, pricedByWeight: false },
    "00068700103650": { name: "Dairyland - Whipping Cream, 946 Millilitre", price: 6.89, pricedByWeight: false },
    "00066013153638": { name: "Nordica - Cottage Cheese 2 % M.F., 500 Gram", price: 4.99, pricedByWeight: false },
    "00602652184178": { name: "Kind - Granola Bars - Dark Chocolate Chunk, 35 Gram", price: 6.99, pricedByWeight: false },
    "00060410061404": { name: "Lay's - Potato Chips, All Dressed - Family Size, 235 Gram", price: 4.79, pricedByWeight: false },
    "00057700018101": { name: "Maynards - Fuzzy Peach, 308 Gram", price: 5.79, pricedByWeight: false },
    "00067312005253": { name: "Voortman - Wafers, Vanilla, 250 Gram", price: 4.99, pricedByWeight: false },
    "00037466019864": { name: "Lindt - Swiss Classic Milk Chocolate Bar, 100 Gram", price: 6.29, pricedByWeight: false },
    "00059966104499": { name: "Redland Farms - Royal Mixed Nuts, No Salt, 350 Gram", price: 11.49, pricedByWeight: false },
    "00066721006684": { name: "Christie - Chips Ahoy! Original Chocolate Chip Cookies, 460 Gram", price: 6.69, pricedByWeight: false },
    "00056600808836": { name: "Twizzlers - Twists Strawberry, 680 Gram", price: 6.19, pricedByWeight: false },
    "00061362434704": { name: "Clover Leaf - Chunk Light Tuna in Water, 170 Gram", price: 3.29, pricedByWeight: false },
    "00063211284164": { name: "Campbell's - Soup, Classic Chicken Noodle, 515 Millilitre", price: 4.49, pricedByWeight: false },
    "08801073210363": { name: "SAMYANG - Instant Ramen - Hot Chicken Flavour, 105 Gram", price: 3.19, pricedByWeight: false },
    "00057000012533": { name: "Classico - Roma Spicy Red Pepper Sauce, 600 Millilitre", price: 5.29, pricedByWeight: false },
    "00067800002528": { name: "Unico - Black Beans, 540 Millilitre", price: 2.79, pricedByWeight: false },
    "00059000004228": { name: "Bick's - Garlic Dill Pickles, 1 Litre", price: 6.99, pricedByWeight: false },
    "00073234020120": { name: "Kokuho Rose - California Supreme White Rice, 1 Kilogram", price: 10.29, pricedByWeight: false },
    "00064200113809": { name: "Catelli - Catelli Classic Spaghetti Pasta, 900 Gram", price: 5.69, pricedByWeight: false },
    "00190569423249": { name: "Green Giant - Mixed Vegetables, 750 Gram", price: 4.89, pricedByWeight: false },
    "00190569423270": { name: "Green Giant - Sweetlets Peas, 750 Gram", price: 4.89, pricedByWeight: false },
    "00190569423256": { name: "Green Giant - Peaches & Cream Corn, 750 Gram", price: 4.89, pricedByWeight: false },
    "00055000205481": { name: "Haagen-Dazs - Dulce De Leche Ice Cream, 450 Millilitre", price: 6.89, pricedByWeight: false },
    "00063211065022": { name: "Hungry-Man - Turkey Dinner Frozen Meal, 455 Gram", price: 7.69, pricedByWeight: false },
    "00056210261113": { name: "Cavendish - Old Fashioned Hashbrown Patties - Onion, 1.2 Kilogram", price: 7.79, pricedByWeight: false },
    "00061763023163": { name: "High Liner - Family Favourites Fish Sticks, 700 Gram", price: 11.99, pricedByWeight: false },
    "00055773000658": { name: "McCain - Super Spirals Fries, Lightly Spiced, 650 Gram", price: 5.69, pricedByWeight: false },
    "00031200445261": { name: "Ocean Spray - Cranberry Cocktail juice - Original, 1.89 Litre", price: 5.99, pricedByWeight: false },
    "00059600060211": { name: "Simply - Orange Juice, Pulp Free, 1.54 Litre", price: 6.49, pricedByWeight: false },
    "00059600048141": { name: "Minute Maid - Apple Juice, 1 Litre", price: 3.29, pricedByWeight: false },
    "00069000008201": { name: "Lipton - Brisk Iced Tea, Lemon, 710 Millilitre", price: 1.99, pricedByWeight: false },
    "00067000104022": { name: "Coca-Cola - Classic Coke, 6 Each", price: 8.69, pricedByWeight: false },
    "00069000154908": { name: "Bubly - Sparkling Water Mango, 12 Each", price: 8.29, pricedByWeight: false },
    "00063211158779": { name: "V8 - Vegetable Cocktail Low Sodium, 1.89 Litre", price: 6.69, pricedByWeight: false },
    "00884394002495": { name: "OKF - Aloe Vera Drink - Sugar Free, 1.5 Litre", price: 4.49, pricedByWeight: false },
    "00068721022336": { name: "Dempster's - White Bread, 570 Gram", price: 4.99, pricedByWeight: false },
    "00068721902492": { name: "Dempster's - Honey & Oatmeal Bread, 600 Gram", price: 5.49, pricedByWeight: false },
    "00068721192114": { name: "Dempster's - Extra Crisp English Muffins, 6 Each", price: 4.99, pricedByWeight: false },
    "00063400059498": { name: "D Italiano - Brizzolio Sausage Buns, 6 Each", price: 4.49, pricedByWeight: false },
    "00068721300151": { name: "Dempster's - Signature The Classic Burger Buns, 8 Each", price: 5.49, pricedByWeight: false },
    "00063400139626": { name: "Casa Mendosa - Triple Baked Burrito Tortillas White XL, 6 Each", price: 6.29, pricedByWeight: false },
    "00779324000507": { name: "Terra Breads - French Baguette, 300 Gram", price: 4.99, pricedByWeight: false },
    "00073435080701": { name: "Kings Hawaiian - Hawaiian Sweet Roll ( Slider Buns) - Original, 12 Each", price: 5.49, pricedByWeight: false },
};

// Create a batch write operation
const batch = firebase.firestore().batch();

// Loop through the dataMap and set documents with specified IDs
Object.entries(dataMap).forEach(([docId, data]) => {
    const docRef = collectionRef.doc(docId); // Use the specified document ID
    batch.set(docRef, data);
});

// Commit the batch write operation
batch
    .commit()
    .then(() => {
        console.log("Batch write operation completed with custom document IDs");
    })
    .catch((error) => {
        console.error("Batch write operation failed: ", error);
    });