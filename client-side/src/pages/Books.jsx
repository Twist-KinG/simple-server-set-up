import React, { useState, useEffect } from 'react';
import { FiBookOpen, FiSearch, FiFilter, FiChevronDown, FiStar, FiDownload, FiBookmark } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Book = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample book data with categories
  const books = [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self-Help",
      rating: 4.8,
      cover: "https://imgs.search.brave.com/OTIPcjZtkPrMZIYbrY9NuSXRzu2gzYJj2XLEbBf_TLs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM0LnBlbmd1aW5y/YW5kb21ob3VzZS5j/b20vY292ZXIvOTc4/MTUyNDc3OTI2OQ",
      description: "A revolutionary guide to building good habits and breaking bad ones."
    },
    {
      id: 2,
      title: "Dune",
      author: "Frank Herbert",
      category: "Sci-Fi",
      rating: 4.7,
      cover: "https://imgs.search.brave.com/YiuQZ8h7yvQ3FbQzgJjJDCqvPCZTaq1x1H0c1M6vhuQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDU4/NDY0NTU5L3Bob3Rv/L2Nsb3NlLXVwLW9m/LWR1bmUtYm9vay1i/eS1mcmFuY2staGVy/YmVydC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9WmRtdmpT/bWxsWXdBWFplbUFM/RDdnWVpSaEZzX0pV/TmtsN3M0UkpiZzZ2/dz0",
      description: "An epic science fiction saga set in a distant future."
    },
    {
      id: 3,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      category: "Thriller",
      rating: 4.5,
      cover: "https://imgs.search.brave.com/p7slH0ZpAUP1mXiIYpkcJIe0XBlfOH6Dr7RbaOlyvms/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aGUt/YmlibGlvZmlsZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzL3Np/bGVudHBhdGllbnQt/MS5wbmc",
      description: "A psychological thriller about a woman's act of violence against her husband."
    },
    {
      id: 4,
      title: "Educated",
      author: "Tara Westover",
      category: "Memoir",
      rating: 4.6,
      cover: "https://imgs.search.brave.com/XbxEEp8A4SwFsp5X-dYLonz9ARnxShfZ8uHMnhv90jc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMzLnBlbmd1aW5y/YW5kb21ob3VzZS5j/b20vY292ZXIvOTc4/MDUyNTUyODA2Nw",
      description: "A memoir about a woman who leaves her survivalist family and goes on to earn a PhD."
    },
    {
      id: 5,
      title: "Project Hail Mary",
      author: "Andy Weir",
      category: "Sci-Fi",
      rating: 4.7,
      cover: "https://imgs.search.brave.com/W3PfOQaYx4tpBbXxg4O0oWsQKFXfP5mjAKwo0PSZejs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFOQTFtUTFjYVMu/anBn",
      description: "An astronaut's lone mission to save humanity from extinction."
    },
    {
      id: 6,
      title: "The Midnight Library",
      author: "Matt Haig",
      category: "Fiction",
      rating: 4.3,
      cover: "https://imgs.search.brave.com/dRXlN535-iTG1vW5pb6saKxOS73un-y1wvzsCUPjJTI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aGUt/YmlibGlvZmlsZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzL21p/ZG5pZ2h0bGlicmFy/eS5wbmc",
      description: "A novel about a library between life and death where each book represents a different life path."
    }
  ];

  // Extract unique categories from books
  const categories = ['All', ...new Set(books.map(book => book.category))];

  // Filter books based on active category and search query
  const filteredBooks = books.filter(book => {
    const matchesCategory = activeCategory === 'All' || book.category === activeCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Book Collection</h1>
          <p className="text-xl text-gray-600">Browse through our extensive catalog of e-books</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-10 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search books or authors..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <FiFilter className="h-5 w-5 text-gray-600 mr-2" />
                <span>Category: {activeCategory}</span>
                <FiChevronDown className="h-5 w-5 text-gray-600 ml-2" />
              </button>
              
              {showFilters && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setActiveCategory(category);
                          setShowFilters(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${activeCategory === category ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Indicator */}
        {activeCategory !== 'All' && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Showing books in: 
              <span className="ml-2 px-3 py-1 bg-indigo-600 text-white rounded-full text-sm">
                {activeCategory}
              </span>
            </h2>
          </div>
        )}

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex h-full flex-col">
                  {/* Book Cover */}
                  <div className="relative">
                    <img 
                      src={book.cover} 
                      alt={`${book.title} book cover - ${book.category} by ${book.author}`}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium">
                      {book.category}
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{book.title}</h3>
                    <p className="text-gray-600 mb-3">by {book.author}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(book.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-gray-500 text-sm ml-1">{book.rating.toFixed(1)}</span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{book.description}</p>
                  </div>

                  {/* Book Actions */}
                  <div className="px-6 pb-4 flex justify-between">
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                      <FiBookmark className="mr-2" /> Save
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
                      <FiDownload className="mr-2" /> Download
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">
                No books found matching your criteria
              </h3>
              <button 
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Book;


