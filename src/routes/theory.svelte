<script>
	import { goto } from '@sapper/app';
	import Nav from '../components/Nav.svelte';


	function handleClick(event) {
		goto('/home');
	}
</script>

<style>
h1, h2 {
	font-family: 'Playfair Display'
}

main {
	display: flex;
	align-items: center;
	flex-direction: column;
	height: 100%;
}

#content {
	width: 55%;
	font-family: 'Oxygen Light';
}

div#button {
	display: flex;
	justify-content: center;
	align-items: center;
}

cite {
	font: 0.8em 'JetBrains Mono';
}

button {
	background-color: #0000;
	border: 0;
}

button:hover {
	transform: scale(0.95);
	transition: transform 0.15s;
}

button:focus {
	transform: scale(0.90);
}
</style>


<main>
<Nav/>
<div id='content'>
	<h1>Theory</h1>
	Determiners introduce noun phrases. They express such notions as number or quantity and the kind of reference of the noun phrase. The important class of determiners are the definite and indefinite articles.
	<h2><u>The definite article</u></h2>
	The definite article is the word <i>the</i>.
	The definite article serves as a determiner with singular or plural count nouns and with non-count nouns:
	<ul>
		<li>the issue/issues</li>
		<li>the information</li>
	</ul>
	<b>The definite article is used when the speaker (or writer) assumes that the hearer(or reader) can identify the reference of a noun phrase.</b>
	<h2><u>The indefinite article</u></h2>
	The indefinite article is represented by two variants: <i>a</i> or <i>an</i>.
	<br>
	The choice between the variants of the indefinite article depends on the initial sound, not the spelling, of the following word. 
	<ul>
		<li><b>A</b> is used before a consonant sound: a way, a video, a one-off event, a U-turn.</li>
		<li><b>An</b> is used before a vowel sound: an idea, an architect, an hour, an x-ray.</li>
	</ul>
	The indefinite article can only be used with singular count nouns, reflecting its historical derivation from the numeral one.<br>
	<b>The indefinite article is used when speaker (writer) cannot assume the ability of the hearer (reader) to identify the reference of a noun phrase.</b>
	<h2><u>Zero article</u></h2>
	The analogous indefinite reference for plurals and non-count nouns is conveyed through the absence of a determiner or through presence of some.
	<ul>
		<li>(some) issues</li>
		<li>(some) information</li>
	</ul>
	<cite>Sidney Greenbaum, The Oxford English Grammar (Oxford University Press, 1996).</cite>
</div>
<div style='flex: 1'></div>
</main>
