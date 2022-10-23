const markdownIt = require("markdown-it")
const htmlmin = require("html-minifier")

const isProduction = process.env.NODE_ENV === 'production'
const slugify = require('slugify');
const slugify_opts = {
  strict: true,
}


module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/static");

  eleventyConfig.markdownTemplateEngine = 'njk'

  eleventyConfig.dir = {
    input: './src',
    output: "./_site",
  }

  eleventyConfig.setTemplateFormats([
    'njk',
    'md',
    'jpg',
    'png',
  ])

  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  }

  md_lib = markdownIt(markdownItOptions)
  .use(require('markdown-it-attrs'))
  .use(require('markdown-it-anchor'), {
    slugify: (s) => slugify(s, slugify_opts)
  })
  
  eleventyConfig.setLibrary("md", md_lib)

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if(isProduction && outputPath && outputPath.endsWith(".html")){
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })

      return minified
    }

    return content
  })

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->"    
  });

  return eleventyConfig
}
