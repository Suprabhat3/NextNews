# NextNews

NextNews is a modern, responsive news aggregation website that uses the News API to deliver the latest headlines from around the world, with a focus on customizable categories and search functionality.

![NextNews Screenshot](https://via.placeholder.com/800x400?text=NextNews+Screenshot)

## Features

- **Modern UI**: Clean, professional design with responsive layout for all devices
- **Category Navigation**: Browse news by categories including General, Business, Technology, Entertainment, Sports, Science, Health, Politics, and International
- **Search Functionality**: Search for news on any topic with real-time results
- **News API Integration**: Fetches up-to-date news from the News API
- **Pagination**: Browse through multiple pages of news results
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Demo

View the live demo [here](#) (Replace with your deployment URL when available)

## Technologies Used

- **HTML5**: For semantic structure
- **CSS3**: For styling and responsive design
- **JavaScript**: For interactivity and API integration
- **News API**: For fetching news content

## Installation

1. Clone this repository:
```bash
git clone https://github.com/SUprabhat3/NextNews.git
cd NextNews
```

2. Create an environment file named `.env` at the root of the project with the following content:
```
NEWS_API_KEY=your_api_key_here
NEWS_API_BASE_URL=https://newsapi.org/v2/everything
DEFAULT_QUERY=India
DEFAULT_FROM_DATE=2025-04-15
DEFAULT_SORT_BY=publishedAt
```

3. Replace `your_api_key_here` with your actual News API key. You can get one by signing up at [News API](https://newsapi.org/).

4. Open the project:
   - If you have a local development server like Live Server for VS Code, you can use that
   - Or simply open the `index.html` file in your browser

## Usage

### Basic Navigation
- Use the navigation bar to browse news by category
- Click on "Read Full Story" on any news card to open the complete article on its original website

### Search
- Enter a keyword or phrase in the search bar
- Press Enter or click the search icon to see results
- The default search term is "India" when the page first loads

### Pagination
- Use the pagination controls at the bottom of the page to navigate through multiple pages of results

## API Configuration

The website uses the News API with the following default configuration:
- Base URL: `https://newsapi.org/v2/everything`
- Default query parameter: `q=India`
- Default date filter: `from=2025-04-15`
- Default sorting: `sortBy=publishedAt`

In a production environment, these values should be loaded from environment variables rather than being hardcoded.

## Customization

### Styling
The website uses a clean, professional color scheme that can be customized in the CSS variables at the top of the style section:

```css
:root {
    --primary-color: #1a73e8;
    --secondary-color: #f8f9fa;
    --text-color: #202124;
    --light-text: #5f6368;
    --border-color: #dadce0;
    --success-color: #34a853;
    --error-color: #ea4335;
}
```

### Categories
To modify the available categories, edit the navigation links in the HTML:

```html
<ul class="nav-links">
    <li><a href="#" class="active" data-category="general">General</a></li>
    <!-- Add or remove categories here -->
</ul>
```

## Browser Support

NextNews is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Limitations

- The News API has a rate limit for free accounts (usually 100 requests per day)
- Some news sources may not provide images, in which case a placeholder is shown
- The free plan of News API only allows access to a limited time range of articles

## Acknowledgments

- News API for providing the news content
- Font Awesome for icons
- Google Fonts for typography

---

Made by Suprabhat with 💌
