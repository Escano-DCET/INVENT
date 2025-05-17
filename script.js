const inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// DOM Elements
const searchInput = document.getElementById('searchInput');

// Buttons
const searchButton = document.getElementById('searchBtn');
const addItemBtn = document.getElementById('addItemBtn');

// Dropdowns
const searchBy = document.getElementById('searchBy');
const sortBy = document.getElementById('sortBy');

// Modals
const addModal = document.getElementById('addModal');
const closeAddModal = document.getElementById('closeAddModal');
const closeEditModal = document.getElementById('closeEditModal');
const editModal = document.getElementById('editModal');

// Forms
const addItemForm = document.getElementById('addItemForm');
const editItemForm = document.getElementById('editItemForm');

// Table
const inventoryBody = document.getElementById('inventoryBody');

// Add Inputs
const itemImage = document.getElementById('itemImage');
const itemName = document.getElementById('itemName');
const itemDetails = document.getElementById('itemDetails');
const itemPrice = document.getElementById('itemPrice');
const itemQuantity = document.getElementById('itemQuantity');

// Edit Inputs
const editItemImage = document.getElementById('editItemImage');
const editItemName = document.getElementById('editItemName');
const editItemDetails = document.getElementById('editItemDetails');
const editItemPrice = document.getElementById('editItemPrice');
const editItemQuantity = document.getElementById('editItemQuantity');

// Event Listeners

// input
// click
// onmousedown
// select
// change
// submit

// Inputs
// searchInput.addEventListener('input', handleSearchInput);

// Buttons
addItemBtn.addEventListener('click', handleAddItemBtnClick);
// searchButton.addEventListener('click', handleSearchButtonClick);

// Dropdowns
// sortBy.addEventListener('change', handleSortByChange);

// Forms
addItemForm.addEventListener('submit', handleAddItemFormSubmit);
editItemForm.addEventListener('submit', handleEditItemFormSubmit);

// Images
// itemImage.addEventListener('change', handleItemImageChange);
// editItemImage.addEventListener('change', handleEditItemImageChange);

// Modals
// addModal.addEventListener('click', handleAddModalClick);
closeAddModal.addEventListener('click', handleCloseAddModalClick);
// closeEditModal.addEventListener('click', handleCloseEditModalClick);

// Functions
function handleAddItemBtnClick(){
    addModal.style.display = "block";
    addModal.style.display = "flex"
};

function handleCloseAddModalClick(){
    addModal.style.display = "none";
}

function handleAddItemFormSubmit(e){
    e.preventDefault();
    const newItem = {
        id: Date.now(),
        name:itemName.value,
        details: itemDetails.value,
        quantity: itemQuantity.value,
        price: itemPrice.value,
        dateAdded: new Date().toISOString(), 
    }

    inventory.push(newItem)
    // Store the items in local storage
    localStorage.setItem('inventory', JSON.stringify(inventory))
    
    // Close the modal 
    handleCloseAddModalClick();

    updateInventoryTable();

    // Empty the form by manually setting the values to empty strings
    // itemName.value = '';
    // itemDetails.value = '';
    // itemQuantity.value = '';
    // itemPrice.value = '';
    // itemImage.value = '';

    // Emmpty the form using built in method
    addItemForm.reset()
}

// Concatenation using + operator
inventoryBody.innerHTML = '<tr><td>' + inventory.id +'</td><td>Details</td></tr>';

// Template literal 
inventoryBody.innerHTML = `<tr><td>${inventory.id}</td><td>${inventory.name}</td><td>${inventory.details}</td><td>${inventory.quantity}</td><td>${inventory.price}</td><td>${inventory.dateAdded}</td></tr>`;

// display table with existing products
// add product
// edit product

document.addEventListener('DOMContentLoaded', ()=> {
    console.log(inventory)
    inventoryBody.innerHTML = '';
    updateInventoryTable();
})

function updateInventoryTable() {
    inventoryBody.innerHTML = '';
    inventory.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.details}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.dateAdded}</td>
            <td>
                <button class="icon-only edit-button" data-id="${item.id}">
                    <img src="https://cdn-icons-png.flaticon.com/512/8748/8748504.png" alt="Edit" />
                </button>
                <button class="icon-only delete-button" data-id="${item.id}">
                    <img src="https://images.icon-icons.com/1808/PNG/512/trash-can_115312.png" alt="Remove" />
                </button>
            </td>
        `;
        inventoryBody.appendChild(row);
    });

    // Attach edit button event listeners
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', handleEditButtonClick);
    });
}

// Handle the edit button click to populate the modal
let currentEditItemId = null;

function handleEditButtonClick(e) {
    const itemId = parseInt(e.currentTarget.getAttribute('data-id'));
    const item = inventory.find(i => i.id === itemId);
    if (!item) return;

    currentEditItemId = itemId;

    // Populate edit form with item data
    editItemName.value = item.name;
    editItemDetails.value = item.details;
    editItemQuantity.value = item.quantity;
    editItemPrice.value = item.price;

    // Show the edit modal
    editModal.style.display = 'flex';
}

// Handle the edit form submission to save the updated item
function handleEditItemFormSubmit(e) {
    e.preventDefault();

    const itemIndex = inventory.findIndex(item => item.id === currentEditItemId);
    if (itemIndex === -1) return;

    // Update item data
    inventory[itemIndex].name = editItemName.value;
    inventory[itemIndex].details = editItemDetails.value;
    inventory[itemIndex].quantity = editItemQuantity.value;
    inventory[itemIndex].price = editItemPrice.value;

    // Save the updated inventory to localStorage
    localStorage.setItem('inventory', JSON.stringify(inventory));

    // Close the modal and reset the form
    editItemForm.reset();
    editModal.style.display = 'none';

    // Refresh the inventory table
    updateInventoryTable();
}

// Handle the close of the edit modal
closeEditModal.addEventListener('click', () => {
    editModal.style.display = 'none';
    editItemForm.reset();
});
