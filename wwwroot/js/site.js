// Financial Reports Section Filtering
$(document).ready(function() {
    // Wait a bit for Bootstrap to initialize
    setTimeout(function() {
        const $dropdownButton = $('#financialReportsDropdown');
        const $filterItems = $('.financial-section-filter');
        const $sectionTables = $('.financial-section-table');

        if ($dropdownButton.length === 0 || $filterItems.length === 0 || $sectionTables.length === 0) {
            console.log('Financial reports filter elements not found');
            return;
        }

        // Function to filter tables
        function filterTables(selectedSection) {
            $sectionTables.each(function() {
                const $tableSection = $(this);
                const tableSectionType = $tableSection.attr('data-section');
                
                if (selectedSection === 'all') {
                    // Show all tables
                    $tableSection.show();
                } else {
                    // Show only table matching the selected section - hide others
                    if (tableSectionType === selectedSection) {
                        $tableSection.show();
                    } else {
                        $tableSection.hide();
                    }
                }
            });
        }

        // Handle dropdown item clicks
        $filterItems.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const selectedSection = $(this).attr('data-section');
            let buttonText = $(this).text().trim();
            
            // If "All Sections", show "Select Section" instead
            if (selectedSection === 'all') {
                buttonText = 'Select Section';
            }
            
            // Update dropdown button text
            $dropdownButton.text(buttonText);
            
            // Filter table sections - this will hide other tables
            filterTables(selectedSection);

            // Close Bootstrap dropdown
            const dropdownElement = $dropdownButton[0];
            if (typeof bootstrap !== 'undefined' && bootstrap.Dropdown) {
                const dropdownInstance = bootstrap.Dropdown.getInstance(dropdownElement);
                if (dropdownInstance) {
                    dropdownInstance.hide();
                }
            }
        });

        // Initialize: Show all tables by default when page loads
        filterTables('all');
        
        console.log('Financial reports filter initialized');
    }, 200);
});
