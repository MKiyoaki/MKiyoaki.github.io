---
# Leave the homepage title empty to use the site title
title: ""
date: 2022-10-24
type: landing

design:
  # Default section spacing
  spacing: "6rem"

sections:
  - block: resume-biography-3
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
      text: ""
      # Show a call-to-action button under your biography? (optional)
#      button:
#        text: Download CV
#        url: uploads/resume.pdf
#    design:
#      css_class: dark
#      background:
#        color: black
#        image:
#          # Add your image background to `assets/media/`.
#          filename: ocean.svg
#          filters:
#            brightness: 0.75
#          size: cover
#          position: center
#          parallax: false
    design:
      css_class: 'waves-background'
  - block: markdown
    content:
      title: 'Research Interests'
      subtitle: ''
      text: |-
        I am currently a research intern at Shanghai AI Lab. I am studying how to introduce formal languages into LLM reasoning process to reduce the hallucination and create safe and trustworthy AI agents. 

        I apply a range of qualitative and quantitative methods, especially the technologies about reinforcement learning. 
        
        Please reach out to collaborate:)
    design:
      columns: '1'
#  - block: collection
#    id: papers
#    content:
#      title: Featured Publications
#      filters:
#        folders:
#          - publication
#        featured_only: true
#    design:
#      view: article-grid
#      columns: 2
#  - block: collection
#    content:
#      title: Recent Publications
#      text: ""
#      filters:
#        folders:
#          - publication
#        exclude_featured: false
#    design:
#      view: citation
#  - block: collection
#    id: talks
#    content:
#      title: Recent & Upcoming Talks
#      filters:
#        folders:
#          - event
#    design:
#      view: article-grid
#      columns: 1
  - block: collection
    id: news
    content:
      title: Recent News
      subtitle: ''
      text: ''
      # Page type to display. E.g. post, talk, publication...
      page_type: post
      # Choose how many pages you would like to display (0 = all pages)
      count: 5
      # Filter on criteria
      filters:
        author: ""
        category: ""
        tag: ""
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ""
      # Choose how many pages you would like to offset by
      offset: 0
      # Page order: descending (desc) or ascending (asc) date.
      order: desc
    design:
      # Choose a layout view
      view: date-title-summary
      # Reduce spacing
      spacing:
        padding: [0, 0, 0, 0]
  - block: markdown
    id: contact
    content:
      title: Contact
      text: |-
        yifeishi [DOT] 1224 [AT] gmail [DOT] com
---
