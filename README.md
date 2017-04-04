# ant-ActorNetworkTool
sankey tool built atop d3.js (for enviro-digital-humanities)

The git folders currently include the full array of working files, js extensions, css etc for demo and, eventually, customized versions of plug-ins.

# The current state of code development: 

As of December 2016, the project includes a demo implimentation of d3's sankey diagram - with: 
* additional user choices/input to determine the look of sankey nodes, including icons, arrowheads, etc., 
* alternate color schemes and interactive options to highlight related links/nodes,
* new functions within the d3 sankey file to allow for node links that are 'externalities,' i.e. contribute value from outside the systems or allow for loses (as opposed to the zero-sum nature of sankeys).
* additional functions with the d3 sankey also enable overlaid links with no quantified value (like cultural, other networks) to aide in showing non-material contributions/flows.
* interactive narratives appended to node iteractions, as an aide to fuller explanatory potential.


# The larger ambitions of the project:

As a landscape designer, much of my teaching is dedicated to helping students conceptualize the messy, multi-scalar webs of agency that have been popularized in Bruno Latour’s Actor Network Theory; while such alliances – combining material processes, regulatory legislation, popular discourse, tectonic shifts – are at the heart of many historic narratives, they are nearly impossible to visually synthesize when creating on-line exhibits. Typically, DH network diagrams, like the force-directed clusters of discourse networks or the linear armature of timelines, exclude signification of mixed-causality in favor of relative, database-derived relationships, which are nuanced with text. My ACH proposal is to support tutorial creation for ‘ANT: Actor Network Tool,’ a modified sankey/ fluvial diagram tool that shows both directionality and the overlay of social actors with networked processes. My work on ANT will be to modify the d3.js sankey code to include looping connections and loses (or external connections), enable the adjustment of tool-tip and node articulation/placement, and coordinate mouse-interaction with multi-div displays of additional artifacts/text.

Working with demonstration data from New England environmental history – Drew Lab’s quantitative study of “Collateral damage to marine and terrestrial ecosystems from Yankee whaling…” and my own, qualitative work on the links of cloth, shipping, and publishing in Thoreau’s “Sounds” – the goal is to develop a tool and tutorials for non-coders that can show either database-weighted networks (quantitative) or more general webs (qualitative) linking environmental, economic, and social systems in mutual inflection and feedback.

ANT development will result in a form-base website (js) to create interactive network graphs. Quantitative and qualitative demonstration examples – from New England environmental history, above – will featured in tutorials which walk users through formatting/loading data/displaying results and the conceptual/communicative weight of interface choices.

