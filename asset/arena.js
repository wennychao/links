// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)



// Okay, Are.na stuff!
let channelSlug = 'expression-tiomb4ullm0' // The “slug” is just the end of the URL
console.log('hi')



// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (data) => {
	// Target some elements in your HTML:
	let channelTitle = document.getElementById('channel-title')
	console.log(channelTitle)
	let channelDescription = document.getElementById('channel-description')
	let channelCount = document.getElementById('channel-count')
	let channelLink = document.getElementById('channel-link')

	// Then set their content/attributes to our data:
	channelTitle.innerHTML = data.title
	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
	channelCount.innerHTML = data.length
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
}



// Then our big function for specific-block-type rendering:
let renderBlock = (block) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.getElementById('channel-blocks')

	// Links!
	if (block.class == 'Link') {
		// console.log(block)

			let linkItem =
			`
			<li class="content-block">
				<div class="link"> 
					<picture>
						<source media="(max-width: 428px)" srcset="${ block.image.thumb.url }">
						<source media="(max-width: 640px)" srcset="${ block.image.large.url }">
						<img src="${ block.image.original.url }">
					</picture>
				</div>
				<div class="data">
					<p><em>Link</em></p>
					<h2 class="h2-long">${ block.title }</h2>
					<p class="description">${ block.created_at
                    }</p>
					<p><a class="link-a" href="${ block.source.url }" target="blank">See the original ↗</a></p>
				</div>
			</li>
			`
			channelBlocks.insertAdjacentHTML('beforeend', linkItem)
		
	}

	// Images!
	else if (block.class == 'Image') {
		// console.log(block)
		let imageItem =
			`
			<li class="content-block">
				<div class="image"> 
					<picture>
						<source media="(max-width: 428px)" srcset="${ block.image.thumb.url }">
						<source media="(max-width: 640px)" srcset="${ block.image.large.url }">
						<img src="${ block.image.original.url }">
					</picture>
				</div>
				<div class="data">
					<p><em>Image</em></p>
					<h2>${ block.title }</h2>
					<p class="description">${ block.created_at
                    }</p>
				</div>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', imageItem)



	}

	// Text!
	else if (block.class == 'Text') {
		// console.log(block)
		let textItem =
			`
			<li class="content-block">
			<div class="text"> 
				<p>${ block.content_html }</p>
			</div>
			<div class="data">
				<p><em>Text</em></p>
				<h2>${ block.title }</h2>
				<p class="description">${ block.created_at }</p>
			</div>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', textItem)
	}

	// Uploaded (not linked) media…
	else if (block.class == 'Attachment') {
		let attachment = block.attachment.content_type // Save us some repetition
		// console.log(block)

		// Uploaded videos!
		if (attachment.includes('video')) {
			console.log('Attached video: ', block)
			// …still up to you, but we’ll give you the `video` element:
			
			let videoItem =
				`
				<li class="content-block">
				<div class="video">
					<p><em>Video</em></p>
					<video controls src="${ block.attachment.url }"></video>
					<p><em><a href="${ block.source.url }" target="blank">Watch original ↗</a></em></p>
				</div>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', videoItem)
			// More on video, like the `autoplay` attribute:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
		}

		// Uploaded PDFs!
		else if (attachment.includes('pdf')) {
			let pdfItem =
				`
				<li class="content-block">
					<div class="image"> 
						<picture>
							<source media="(max-width: 428px)" srcset="${ block.image.thumb.url }">
							<source media="(max-width: 640px)" srcset="${ block.image.large.url }">
							<img src="${ block.image.original.url }">
						</picture>
					</div>
					<div class="data">
						<p><em>PDF</em></p>
						<h2>${ block.title }</h2>
						<p class="description">${ block.description_html }</p>
						<p><a href="${ block.source.url }" target="blank">See the original ↗</a></p>
					</div>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', pdfItem)
		}

		// Uploaded audio!
		else if (attachment.includes('audio')) {
			// …still up to you, but here’s an `audio` element:
			let audioItem =
				`
				<li>
					<p><em>Audio</em></p>
					<audio controls src="${ block.attachment.url }"></audio>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', audioItem)
			// More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
		}
	}

	// Linked media…
	else if (block.class == 'Media') {
		console.log(block)
		let embed = block.embed.type

		// Linked video!
		if (embed.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			let linkedVideoItem =
				`
				<li class="content-block">
				<div class="video">
					<p><em>Video</em></p>
					${ block.embed.html }
					<p><em><a href="${ block.source.url }" target="blank">Watch original ↗</a></em></p>
				</div>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

		// Linked audio!
		else if (embed.includes('rich')) {
			// …up to you!

			let linkedAudioItem = 
			`
			<li class="content-block">
			<div class="audio">
				<p><em>Audio</em></p>
				${ block.embed.html }
				<img src="${ block.image.original.url }">
				<p><em><a href="${ block.source.url }" target="blank">Listem ↗</a></em></p>
			</div>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkedAudioItem)
		}
	}
}



// It‘s always good to credit your work:
let renderUser = (user, container) => { // You can have multiple arguments for a function!
	let userAddress =
		`
		<address>
		<!-- <img src="${ user.avatar_image.display }"> --!>
		<div class="authors">
			<p>${ user.first_name }  —  <a href="https://are.na/${ user.slug }">Dive into Are.na ↗</a></p>
		</div>
		</address>
		`
	container.insertAdjacentHTML('beforeend', userAddress)
}



//Changing H2s depending on lenght of h2
let fixingBlocksContent = () => {

	let allH2s = document.querySelectorAll('h2')
	//console.log(allH2s)

	allH2s.forEach((currentH2) => {

		if (currentH2.textContent.length > 52) 
		{
			currentH2.classList.add('h2-long2')
		} 
		else if (currentH2.textContent.length >= 14) 
		{
			currentH2.classList.add('h2-long')
		} 
		else if (currentH2.textContent.length < 1)
		{
			currentH2.innerHTML = '<h2 class="h2-long">EXPRESSION.EXPRESSSIONN.EXXPRESSSSIONNN-EXPRESSION.</h2>'
			currentH2.classList.add('fakeText')
		}
		else 
		{
			currentH2.classList.remove('h2-long')
		}
	})

	//Now I wanna grab descriptions
	let allDescriptions = document.querySelectorAll('.description')
	//console.log(allDescriptions)

	allDescriptions.forEach((currentDescription) => {
		if (currentDescription.textContent.length < 1)
		{
			currentDescription.innerHTML = "<span>error.rror.ror.or.r error.rror.ror.or.r- error.rror.ror.or.r error.rror.ror.or.r-- error.rror.ror.or.r- error.rror.ror.or.r error.rror.ror.or.r error.rror.ror.or.r error.rror.ror.or.r-- error.rror.ror.or.r- error.rror.ror.or.r error.rror.ror.or.r--  </span>"
			currentDescription.classList.add('fakeText')
		}

		if (currentDescription.textContent === "null")
		{
			currentDescription.innerHTML = "<span>error.rror.ror.or.r error.rror.ror.or.r- error.rror.ror.or.r error.rror.ror.or.r-- error.rror.ror.or.r- error.rror.ror.or.r error.rror.ror.or.r error.rror.ror.or.r error.rror.ror.or.r-- error.rror.ror.or.r- error.rror.ror.or.r error.rror.ror.or.r--  </span>"
			currentDescription.classList.add('fakeText')
		}

		else {}
	})

}

// Trying to change the layout on images
	let imageLayoutReverse = () => {
		let allLis = document.querySelectorAll('li') //I'm selecting all <li>
	
		for (let i = 1; i < allLis.length; i++) { //this basically creates a locqal variable sets it to 1 and keep adding until it reaches the size of the list
			let currentChildren = allLis[i].children //creates a variable to select the current <li> children
			let previousChildren = allLis[i - 1].children //creates a variable to check the previous <li> children
	
			let currentHasImage = Array.from(currentChildren).some(child => child.classList.contains('image')) //this is how you check for the children that has the .image class
			let previousHasImage = Array.from(previousChildren).some(child => child.classList.contains('image'))
	
			if (currentHasImage && previousHasImage) { //checks to see if current <li> and previous <li> had the .image
				console.log('Two images in a row!')
	
				allLis[i].classList.add('content-block-reverse') //yay apply the content-block-reverse to the current <li>
			}
		}
	}

// function for the "snap scroll"
let scrollingSlideShow = () => {
	let allLis = document.querySelectorAll('li')
	console.log('Lists Here:', allLis)
	
	allLis.forEach((li) => {
		let sectionObserver = new IntersectionObserver ((entries) => {
			let [entry] = entries

			if (entry.isIntersecting && !isScrolling) 
			{
				const scrollY = entry.target.offsetTop + (entry.target.offsetHeight / 2) - (window.innerHeight / 2) // this one is getting the li hieght and dividing it 
				window.scrollTo({ top: scrollY, behavior: 'smooth' }) // this is making it scroll to that place
			}
			else {}
		})

		sectionObserver.observe(li) 
	})

}

//trying to make a scroll to top fucntion

let isScrolling = false //creating a checker for scrool, so the scrools stop conflicting

let scrollToTopButton = document.querySelector('nav a[href="#allTheWayUp"]')
let scrollDown = document.querySelector('nav a[href="#bottom"]')

scrollToTopButton.onclick = () => {
	isScrolling = true	
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	})
}

scrollDown.onclick = () => {

	let scrollAmount = 600

	window.scrollTo({
		top: window.scrollY + scrollAmount,
		behavior: 'smooth'
	})
}

//resetting the scroll
window.addEventListener('scroll', () => {
	if (isScrolling && window.scrollY === 0) {
		isScrolling = false
	}
})



//function to make everything glitch
let scrollingGlitch = () => {
	//let grabBody = document.querySelector('body')
	let sectionGrab = document.querySelectorAll('section')
	let sectionGrab2 = document.querySelectorAll('h2')
	let sectionGrab3 = document.querySelectorAll('.noise')
	let sectionGrab4 = document.querySelectorAll('.navMenu')
	let sectionGrab5 = document.querySelector('footer')

	window.onscroll = () => {
		sectionGrab.forEach(section => {
			section.classList.add('glitch')

		setTimeout(() => {
			section.classList.remove('glitch')
		})
	})
		sectionGrab2.forEach(section => {
			section.classList.add('glitch')

		setTimeout(() => {
			section.classList.remove('glitch')
		})
	})
		sectionGrab3.forEach(section => {
			section.classList.add('noise-scroll')

		setTimeout(() => {
			section.classList.remove('noise-scroll')
		})
	})
		sectionGrab4.forEach(section => {
			section.classList.add('glitch')

		setTimeout(() => {
			section.classList.remove('glitch')
		})
	})
	if (sectionGrab5) {
        sectionGrab5.classList.add('footerGlitch')

        setTimeout(() => {
            sectionGrab5.classList.remove('footerGlitch')
        })
    }
	}	// 
}

// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log(data) // Always good to check your response!
		placeChannelInfo(data) // Pass the data to the first function

		// Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
		data.contents.reverse().forEach((block) => {
			// console.log(block) // The data for a single block
			renderBlock(block) // Pass the single block data to the render function
		})

		// Also display the owner and collaborators:
		let channelUsers = document.getElementById('channel-users') // Show them together
		data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
		renderUser(data.user, channelUsers)
		
		//my added functions here:
		fixingBlocksContent();
		scrollingSlideShow();
		scrollingGlitch();
		imageLayoutReverse();



	

		
	})

