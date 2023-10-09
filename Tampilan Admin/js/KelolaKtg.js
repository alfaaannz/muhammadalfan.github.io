const table = document.getElementById('dataTable');
      const showEntriesInput = document.getElementById('showEntries');
      const searchInput = document.getElementById('searchInput');
      const currentPageDisplay = document.getElementById('currentPage');
  
      const data = [
        { no: 1, category:'Clothes',productCount:'10'},
        { no: 2, category:'Jeans',productCount:'20'},
        // Add more data as needed
      ];
  
      let currentPage = 1;
      let entriesPerPage = 5; // Default entries per page
      function populateTableSearch() {
        const startIndex = (currentPage - 1) * entriesPerPage;
        const endIndex = Math.min(startIndex + entriesPerPage, dataToShow.length);
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';
        if(dataToShow.length !== 0){
          for (let i = startIndex; i < endIndex; i++) {
            const rowData = dataToShow[i];
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${rowData.no}</td>
            <td>${rowData.category}</td>
            <td>${rowData.productCount}</td>
            `;
            tbody.appendChild(row);
          }
        }else{
          const row = document.createElement('tr');
          row.innerHTML = `
            <td colspan="5">Data Tidak Ditemukan</td>
          `;
          tbody.appendChild(row);
        }
      
        currentPageDisplay.textContent = currentPage;
      }


      function populateTable() {
        const startIndex = (currentPage - 1) * entriesPerPage;
        const endIndex = Math.min(startIndex + entriesPerPage, data.length);
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';
        for (let i = startIndex; i < endIndex; i++) {
          const rowData = data[i];
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${rowData.no}</td>
            <td>${rowData.category}</td>
            <td>${rowData.productCount}</td>
          `;
          tbody.appendChild(row);
        }
       
        currentPageDisplay.textContent = currentPage;
      }
  
      function updateTable() {
        entriesPerPage = parseInt(showEntriesInput.value) || 10;
        currentPage = 1;
        populateTable();
      }
  
      function nextPage() {
        const maxPage = Math.ceil(data.length / entriesPerPage);
        if (currentPage < maxPage) {
          currentPage++;
          populateTable();
        }
      }
  
      function previousPage() {
        if (currentPage > 1) {
          currentPage--;
          populateTable();
        }
      }


  
      function searchTable() {
        const searchValue = searchInput.value.toLowerCase();

        const filteredData = data.filter(item => {
          // Ubah pencarian agar mencakup semua kolom
          for (const prop in item) {
            if (item[prop].toString().toLowerCase().includes(searchValue)) {
              return true;
            }
          }
          return false;
        });

        currentPage = 1;
        dataToShow = filteredData;  // Update dataToShow dengan hasil pencarian
        populateTableSearch();  // Panggil populateTable untuk menampilkan hasil pencarian
      }

      populateTable();
  

      showEntriesInput.addEventListener('input', updateTable);
      searchInput.addEventListener('input', searchTable);