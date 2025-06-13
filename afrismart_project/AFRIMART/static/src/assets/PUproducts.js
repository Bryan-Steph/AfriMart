
        document.addEventListener('DOMContentLoaded', function() {
            // Auto-save functionality
            let saveTimeout;
            const formElements = document.querySelectorAll('input, select, textarea, [contenteditable]');
            
            formElements.forEach(element => {
                element.addEventListener('input', () => {
                    clearTimeout(saveTimeout);
                    saveDraft();
                });
            });

            function saveDraft() {
                // Show saving indicator
                const draftStatus = document.getElementById('draft-status');
                draftStatus.classList.remove('hidden');
                
                // Simulate saving (in a real app, this would be an API call)
                saveTimeout = setTimeout(() => {
                    draftStatus.classList.add('hidden');
                    // Here you would actually save the data
                    console.log('Draft saved');
                }, 1000);
            }

            // Title character counter
            const titleInput = document.getElementById('product-title');
            const titleCounter = document.getElementById('title-counter');
            
            titleInput.addEventListener('input', () => {
                titleCounter.textContent = `${titleInput.value.length}/140`;
            });

            // Rich text editor functionality
            const richTextButtons = document.querySelectorAll('.rich-text-btn');
            const descriptionEditor = document.getElementById('description-editor');
            
            richTextButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const command = button.dataset.command;
                    const value = button.dataset.value;
                    
                    if (command === 'createLink' || command === 'insertImage') {
                        const url = prompt(command === 'createLink' ? 'Enter link URL:' : 'Enter image URL:');
                        if (url) {
                            document.execCommand(command, false, url);
                        }
                    } else if (command === 'formatBlock') {
                        document.execCommand('formatBlock', false, value);
                    } else {
                        document.execCommand(command, false, null);
                    }
                    
                    // Toggle active state
                    if (command !== 'createLink' && command !== 'insertImage') {
                        button.classList.toggle('active');
                    }
                    
                    descriptionEditor.focus();
                    updateActiveButtons();
                });
            });

            function updateActiveButtons() {
                richTextButtons.forEach(button => {
                    const command = button.dataset.command;
                    if (command === 'formatBlock') {
                        const value = button.dataset.value;
                        const formatBlockValue = document.queryCommandValue('formatBlock');
                        button.classList.toggle('active', formatBlockValue === value);
                    } else {
                        button.classList.toggle('active', document.queryCommandState(command));
                    }
                });
            }

            descriptionEditor.addEventListener('click', updateActiveButtons);
            descriptionEditor.addEventListener('keyup', updateActiveButtons);

            // Media upload functionality
            const mediaUploadArea = document.getElementById('media-upload-area');
            const mediaUploadInput = document.getElementById('media-upload-input');
            const mediaPreviewContainer = document.getElementById('media-preview-container');
            const mediaPreviewTemplate = document.getElementById('media-preview-template');
            let mainImageIndex = 0;
            
            mediaUploadArea.addEventListener('click', () => {
                mediaUploadInput.click();
            });
            
            mediaUploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                mediaUploadArea.classList.add('border-emerald-400', 'bg-emerald-50');
            });
            
            mediaUploadArea.addEventListener('dragleave', () => {
                mediaUploadArea.classList.remove('border-emerald-400', 'bg-emerald-50');
            });
            
            mediaUploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                mediaUploadArea.classList.remove('border-emerald-400', 'bg-emerald-50');
                if (e.dataTransfer.files.length > 0) {
                    handleFiles(e.dataTransfer.files);
                }
            });
            
            mediaUploadInput.addEventListener('change', () => {
                if (mediaUploadInput.files.length > 0) {
                    handleFiles(mediaUploadInput.files);
                }
            });
            
            function handleFiles(files) {
                Array.from(files).forEach((file, index) => {
                    if (!file.type.match('image.*')) return;
                    
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const previewItem = mediaPreviewTemplate.content.cloneNode(true);
                        const img = previewItem.querySelector('img');
                        img.src = e.target.result;
                        
                        const removeBtn = previewItem.querySelector('.media-remove');
                        removeBtn.addEventListener('click', (event) => {
                            event.stopPropagation();
                            img.parentElement.remove();
                            reindexMainImage();
                        });
                        
                        const setMainBtn = previewItem.querySelector('.media-set-main');
                        setMainBtn.addEventListener('click', (event) => {
                            event.stopPropagation();
                            setAsMainImage(img.parentElement);
                        });
                        
                        const mainIndicator = previewItem.querySelector('.media-main-indicator');
                        if (mediaPreviewContainer.children.length === 0) {
                            mainIndicator.classList.remove('hidden');
                        }
                        
                        img.parentElement.addEventListener('click', () => {
                            setAsMainImage(img.parentElement);
                        });
                        
                        mediaPreviewContainer.appendChild(previewItem);
                    };
                    reader.readAsDataURL(file);
                });
            }
            
            function setAsMainImage(element) {
                // Remove main indicator from all images
                document.querySelectorAll('.media-main-indicator').forEach(indicator => {
                    indicator.classList.add('hidden');
                });
                
                // Add main indicator to clicked image
                const indicator = element.querySelector('.media-main-indicator');
                if (indicator) {
                    indicator.classList.remove('hidden');
                }
                
                // Move this image to the first position
                if (element.parentElement.firstChild !== element) {
                    element.parentElement.insertBefore(element, element.parentElement.firstChild);
                }
                
                reindexMainImage();
            }
            
            function reindexMainImage() {
                document.querySelectorAll('.media-preview').forEach((preview, index) => {
                    if (index === 0) {
                        preview.querySelector('.media-main-indicator')?.classList.remove('hidden');
                    } else {
                        preview.querySelector('.media-main-indicator')?.classList.add('hidden');
                    }
                });
            }

            // Make media previews sortable (drag to reorder)
            new Sortable(mediaPreviewContainer, {
                animation: 150,
                ghostClass: 'bg-emerald-50',
                onEnd: function() {
                    reindexMainImage();
                }
            });

            // Variants functionality
            const addVariantBtn = document.getElementById('add-variant-btn');
            const variantsContainer = document.getElementById('variants-container');
            const variantTemplate = document.getElementById('variant-template');
            
            addVariantBtn.addEventListener('click', () => {
                const variantClone = variantTemplate.content.cloneNode(true);
                const variantRow = variantClone.querySelector('.variant-row');
                
                // Set up remove button
                variantRow.querySelector('.variant-remove').addEventListener('click', () => {
                    variantRow.remove();
                });
                
                // Set up color picker for color variants
                const variantTypeSelect = variantRow.querySelector('.variant-type');
                const colorOptions = variantRow.querySelector('.color-options');
                const variantValueInput = variantRow.querySelector('.variant-value-input');
                
                variantTypeSelect.addEventListener('change', function() {
                    if (this.value === 'color') {
                        colorOptions.classList.remove('hidden');
                        variantValueInput.classList.add('hidden');
                    } else {
                        colorOptions.classList.add('hidden');
                        variantValueInput.classList.remove('hidden');
                    }
                });
                
                // Set up color selection
                variantRow.querySelectorAll('.color-option').forEach(option => {
                    option.addEventListener('click', function() {
                        if (this.dataset.color === 'custom') {
                            const color = prompt('Enter hex color code (e.g. #ff0000):');
                            if (color) {
                                this.style.backgroundColor = color;
                                this.dataset.color = color.toLowerCase();
                            }
                        } else {
                            const input = variantRow.querySelector('.variant-value-input input');
                            input.value = this.dataset.color.charAt(0).toUpperCase() + this.dataset.color.slice(1);
                        }
                    });
                });
                
                variantsContainer.appendChild(variantClone);
            });

            // Initialize with one variant
            addVariantBtn.click();

            // Inventory tracking toggle
            const trackInventoryCheckbox = document.getElementById('track-inventory');
            const inventoryFields = document.getElementById('inventory-fields');
            
            trackInventoryCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    inventoryFields.classList.remove('opacity-50', 'pointer-events-none');
                } else {
                    inventoryFields.classList.add('opacity-50', 'pointer-events-none');
                }
            });

            // Form submission
            const publishBtn = document.getElementById('publish-btn');
            const saveDraftBtn = document.getElementById('save-draft-btn');
            const previewBtn = document.getElementById('preview-btn');
            
            publishBtn.addEventListener('click', function() {
                // Validate form
                if (!validateForm()) return;
                
                // Submit form (simulated)
                alert('Product published successfully!');
                // In a real app, this would submit to your backend
            });
            
            saveDraftBtn.addEventListener('click', function() {
                saveDraft();
                alert('Draft saved successfully!');
            });
            
            previewBtn.addEventListener('click', function() {
                if (!validateForm(true)) return;
                alert('Opening preview...');
                // In a real app, this would open a preview window
            });
            
            function validateForm(isPreview = false) {
                const title = document.getElementById('product-title').value.trim();
                const description = document.getElementById('description-editor').textContent.trim();
                const category = document.getElementById('product-category').value;
                const images = document.querySelectorAll('.media-preview').length;
                
                if (!title) {
                    alert('Please enter a product title');
                    document.getElementById('product-title').focus();
                    return false;
                }
                
                if (!description) {
                    alert('Please enter a product description');
                    document.getElementById('description-editor').focus();
                    return false;
                }
                
                if (!category && !isPreview) {
                    alert('Please select a category');
                    document.getElementById('product-category').focus();
                    return false;
                }
                
                if (images === 0 && !isPreview) {
                    alert('Please upload at least one product image');
                    return false;
                }
                
                return true;
            }
        });
  