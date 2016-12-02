var articles = [];
var authorDropdownArray = [];
var categoryDropdownArray = [];

function Article (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

function AuthorNameDropdown (opts) {
  this.author = opts.author;
}

function CategoryDropdown (opts) {
  this.category = opts.category;
}

AuthorNameDropdown.prototype.toHtml = function() {
  var $authorFilterTemplateScript = $('#author-filter-template').html();
  var theFilterTemplate = Handlebars.compile($authorFilterTemplateScript);
  // var theCompiledHtml = theFilterTemplate(ourLocalData[i]);
  // $('#author-filter').html(theCompiledHtml);
  return theFilterTemplate(this);
};

CategoryDropdown.prototype.toHtml = function() {
  var $categoryFilterTemplateScript = $('#category-filter-template').html();
  var theFilterTemplate = Handlebars.compile($categoryFilterTemplateScript);
  return theFilterTemplate(this);
};

Article.prototype.toHtml = function() {
  // DONE: If your template will use properties that aren't on the object yet, add them.
  //   Since your template can't hold any JS logic, we need to execute the logic here.
  //   The result is added to the object as a new property, which can then be referenced
  //   by a key in the template. For example, you might want to display how old a post is,
  //   or say "(draft)" if it has no publication date:
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  // TODO: Use handlebars to render your articles!
  //       - Select your template from the DOM.
  //       - Now "compile" your template with Handlebars.
  //       - Don't forget to return your template for this article.
  var $articleTemplates = $('#articles-template').html();
  var templateRender = Handlebars.compile($articleTemplates);
  return templateRender(this);
};

ourLocalData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

ourLocalData.forEach(function(ele) {
  articles.push(new Article(ele));
});

articles.forEach(function(a){
  $('#articles').append(a.toHtml());
});

ourLocalData.forEach(function(ele) {
  authorDropdownArray.push(new AuthorNameDropdown(ele));
});

authorDropdownArray.forEach(function(a){
  $('#author-filter').append(a.toHtml());
});

ourLocalData.forEach(function(ele) {
  categoryDropdownArray.push(new CategoryDropdown(ele));
});

categoryDropdownArray.forEach(function(a){
  $('#category-filter').append(a.toHtml());
});
