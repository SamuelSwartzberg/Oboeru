# Getting Started

Download the .js/.css files and place them in your collection.media folder (or set that up as a repo, but bear in mind anki does not accept subfolders in collection.media). Import the note type.

# Concepts

Every note creates one or two cards, no more (currently). Each card, in my terminology, has a front and a back, the front being the part of the card you see before you flip it, and the back being the part of the card that becomes visible once you flip it. (Please note that under this definition, the front is also visible once you flip it. In Anki's terms, {\{FrontSide}} is included on the backside.)
A Fields appear on the front of the first card, and on the back of the second card, should it be enabled. The reverse is true for B fields.
Flipping the card is what you do when you press the "Check Answer" button.
Whenever I write "add anything", I personally just usually add "y", but you are free to copy-paste the complete works of Shakespeare instead.

# Demo Images

# Fields

## A_1, A_2, ..., B_3

A_1, A_2, A_3 are just three fields for A content. There are multiple reasons why you would want to separate this into different fields, as should become apparent. The relevant B fields function analogously.

## *_Typable

These are somewhat counterintuitive, but consistent. These will display as regular A/B fields on their respective front, but will create a Type: type field if they are on the back. If you experiment, you'll get the hang of it.

## *_Main

Same as the numbered A and B fields, but since these are always qualified in some way (Front, Back, FrontBack), these are not numbered

## *_Image

Takes any number of `<img>` elements and tries to display them prettily. Within reason, it will preserve the original image if only one is given, if more are given, it will flexbox them.

## *_Front

Only displays on the front of cards. If combined with A or B, only displays on that respective front side.

## *_Extra

A field for information that is additional, is therefore rendered smaller and with less opacity.

## *_QuestionText

A field for headings, which for me mostly end up being questions. For obvious reasons, only displays on the front side.

## *_FrontBack

Display on front and back, duh.

## *_FrontBack_Main_Begin/End

Display before all the relevant Main fields (So A/B_1-3, _Main, Typable)

## Format_FlexDirection

So, all the main fields (So A/B_1-3, _Main, Typable) are flexboxed. If you set this to "flexDirectionColumn", it will create a column, not a row.

## Format_ContentBox

Will surround all the main fields that have content (So A/B_1-3, _Main, Typable) with a nice pretty box, and is necessary for some of the features. Add `<div>`s for each line if you want multiline boxes. To enable, enter "contentBox" (without quote-marks).

## AddReverse

Input anything to add a reverse card. Without this, A fields are identical to Front, and B are identical to Back.

## BrowserOnly_Info

Selfexplanatory, will not render but can be used, for example, to track sources etc.

## BrowserOnly_RankingSeries

For example for Frequency information, or to preserve a sort order safely. Will not render on card.

## Utilities_textarea

Add anything to render a text notepad. Content is preserved when flipping, so can be used to check one's answer, or just as a place to do some thinking in writing.

## Utilities_calculator

Add anything to render a scientific calculator. Because that was the Anki feature everyone had been asking for.

## Utilities_sketchpad

Add anything to add a fully functional sketchpad for drawing, complete with different colors and font sizes. Useful for e.g. Kanji, formulae, flags, and answering the card "What does the Mona Lisa look like?" Preserves content when flipping card.

## Utilities_sketchpad_bg_image

Add an image as a BG to the sketchpad, to draw over it. Generally, I would recommend image occlusion (by Glutanimate) for any image-based flashcards, but this might be useful in rare circumstances. Only accepts the filepath, it will error if you try inserting an img. Check that anki doesn't add weird HTML to this, or it will fail.

## ReorderMainFieldsRandomly

Add anything to randomize the field order of the main elements (So A/B_1-3, _Main, Typable). Usefull for multiple-choice, as will be explained in the Features section.

## ReorderText

Add reorderText to have all `<i>` s be randomly shuffled, and become clickable to reorder them. In effect, you can make flashcards that are based on putting elements in a correct order, similar to Duolingo's word order tasks. Be sure to add all the text into one of the main fields (Ideally a FrontBack one, so you don't have to do it twice), and be sure to only use one main field, otherwise things will not work as intended.

# Features

## Floating Play button

On AnkiDroid, the button it generates should float to the top right of the screen. Have more than one audio file in your note? Tough luck.

## Multiple Choice

In general, do not use multiple choice. But if you, like me, have some legacy multiple choice cards or can see some use in them (like in minimal pair testing), there is a multiple choice feature.
Just enable contentBoxes and fill one of the FrontBack fields, and the card will assume you are doing multiple choice. Tap on the box you think it is and see if you're right or wrong!

## Word order flashcards

See ReorderText

## Card Colors

Cards can change color based on tag. Just add a line like this to the CSS file: "[data-tag*="$YOUR_TAG_OR_PART_OF_TAG_HERE"]~* { --dark-color: $R,$G,$B;}", with $R, $G, $B Being the desired color values.
Be sure to check for uniqueness, `[data-tag*="ja"] will match "japanese" but also "favorite-places-in-jakarta" or "ways-to-spell-adjacent" or "jazzdance".

## Faux clozes

Ever not want to switch to cloze note type, or wanted to use the handy calculator (see above) in your clozes? Never fear, any element surrounded by `<u>` tags will render as a cloze on the front, and as bold on the back. Combine with FrontBack for profit!

## Highlighiting

`<span class="highlightMain">` makes that text stand out like it's nobodies business.

## Keys

`<div class="key"><span>$YOUR_KEY_HERE</span></div>` makes a nice-looking oversized keyboard key. Perfect for learning how to comment out code in your favorite IDE, only to realize that they assume you have a / button, but you're using a German keyboard.

## IPA

If you give something the .ipa class, it will be surrounded by square brackets and have a somewhat more congenial line-height.

## code

<code> tags should make your code look a little better, although I'm still not a huge fan right now.

# Requirements

The fonts specified in the .css file, to be found for free at Google Fonts.

# Considerations & Warnings

## If something looks broken, chances are Anki inserted a `<div>`

Anki loves to insert `<div>`s, `<br>`s, nbsps and other fun stuff that completely breaks the CSS. Be warned.

## Italics are turning into boxes and other such issues

Some tags have gotten the good ol' CSS reset, and some have been appropriated for different uses. This isn't great semantically, but is great for quick card creation. If you want to use those tags (although I personally think they clash with the design), change the CSS to your liking.

## Why is the code from the _anki_globals.js file in every .js file?

Because I like refactoring, but anki loads .js async, and dealing with that is too much of a hassle.

## Help! There are things happening and I don't know why?

This might be down to bad code on my part, or maybe you're missing one of the .js files. Nothing should be happening not contained in the HTML, CSS or JS.

## Help! My .js/.css updates are not showing up on AnkiDroid

Anki does not sync media changes by default. Take the Refresh Media References Addon found at https://github.com/Glutanimate/anki-addons-misc, download it, remove the clearMemoryCaches() line from the relevant python file, and move the folder to your addons folder. Thanks to an anonymous commenter on Ankiweb for the tip, and to Glutanimate for one of many, many amazing addons!

## Help! XYZ doesn't work on AnkiMobile!

Sadly, I don't own an iOS device. If you can fix it, feel free to submit a pull request!

## Do you even use other note types?

Yes. An edited version of the default Cloze one, as well as Image Occlusion Enhanced and Overlapping Clozes, both by Glutanimate. <3 Glutanimate.

## What is Anki?

暗記

## Bugs

This is amateur JS and CSS, and I also want to spend time studying with Anki, not just coding. If you find a bug or want to refactor the code in some way, or would like a feature, a issue tracker entry is appreciated, but I might not get to it soon (or perhaps ever). Should you want to submit a pull request, do open a issue first and discuss it with me, but in general, I'd be more than happy to accept them.
Actually, should you want to improve this README, I'd love that, too. Writing documentation is not my favorite pasttime :P

## Love

Don't let this perfunctory and somewhat harsh README fool you: I do love y'all! <3

# Acknowledgments

Glutanimate is simply the best thing that could have happened to Anki <3
Calculator adapted from: https://codepen.io/carbonhoarder/pen/zrJZPK by Carbonhoarder
SVG color droplet: color by shashank singh from the Noun Project
Math.js: https://mathjs.org/
Whoever on StackOverflow (or Github, I can't recall) figured out that there are different methods needed to save things on Android vs. Desktop, and what those are.
