JiveJS - Web UI Made Simple
===

### Build your UI with simple HTML markup and CSS

Use standard HTML & CSS practices to create rich, object oriented UI components without 
writing a single line of Javascript. For example, making a dropdown menu is an easy HTML block:

    <nav id="primary" class="dropdown">

		<a href="#">JiveJS - Web UI Made Simple</a>
	
		<nav class="dropdown-menu" style="display:none;">

			<a href="#featues">Features</a>

		</nav>

	</nav>

The above creates a _Dropdown_ UI component which can be styled and nested within other dropdown menus. By using
a common ruleset for developing UI component, many of Jive's features can be mashed up together with suprising ease.

### White Label UI

Unlike other UI libraries like Bootstrap, Jive is a white label UI framework meaning *that it has no aesthetic styling*. 
Buttons, menus, and other UI components only have the barebones stylings. The rest of it is up to you. If there's one 
thing we've learned: designers are pretty picky people so we give them complete creative freedom by having no hand
in design choices.

### Mean, Lean UI Machine
Weighing in at a mere 19kb, Jive will be one of the smallest dependencies on your page. It is built ontop of the 
popular JS framework, jQuery. 

Download the library [at GitHub](https://github.com/maxatbrs/JiveJS). 

**For every second you don't download and use JiveJS, a person installs Parallels on a new MacBookPro to use IE7 
and Outlook 2003.**

## The JiveJS Project

### See It In Action
We have a demo page that shows Jive in action and is also included in the source for examples.
[Check it out @JiveJS.com](http://jivejs.com/).

### Learn Fundamentals On GitHub
Read our wiki about Jive and how to [get started with Jive](https://github.com/maxatbrs/JiveJS/wiki/Getting-Started).

### They See Me Trackin, They Be Hatin'
We use Pivotal Tracker to maintain the project. Check it out [here](https://www.pivotaltracker.com/s/projects/540025).

## Further

### Why was Jive Built?

Developers always need common UI components such tabbed interfaces, overlays, and slideshows. There 
have been alot of attempts to solve this problem. Everytime we went with one toolkit over another, we 
always had to hack it to pieces to work within the scope of design or write a lot of javscript hooks to make function. 
We were sick of it and said _damnit, can't we just write HTML and let JS do the rest?_

### Simple to learn but powerful under the hood

Since Jive is essentially a _HTML markup framework for UI component delegation (oh god)_, it means that anyone who knows 
HTML can get busy, quick. Dig deeper and you will find a highly organized, object oriented approach to Javascript 
that makes jQuery plugins look like old punch-card code. While thing library is built ontop of jQuery, 
we've taken a different approach towards UI component development.