// Replace the matching image files and project fields here when real work is ready.
// Set concept:false only for genuine work, with an accurate project description.
const SERVICES = [
  {
    num: '01', title: 'Architectural\nVisualization', short: 'Spaces imagined. Atmosphere made tangible.',
    body: 'Considered images of architecture and interiors, shaped by natural light, material detail and a sense of place. For architects, designers and developers presenting a space before it is built.',
    tags: ['EXTERIORS', 'INTERIORS', 'PROPERTY MARKETING'],
    deliverables: 'Exterior and interior stills, detail views and presentation-ready image sets.',
    process: 'Drawings & references → composition & lighting → final images',
    project: { title: 'Cliff House', type: 'Residential exterior study', description: 'A coastal residence explored through warm interiors, raw stone and the last light of day.', image: 'architecture', alt: 'Illuminated concrete and glass pavilion on a coastal cliff at dusk', concept: true }
  },
  {
    num: '02', title: 'Automotive\nCinematics', short: 'Form, light and the feeling of performance.',
    body: 'Automotive imagery that brings out the character of a vehicle. Carefully shaped reflections, purposeful camera angles and cinematic lighting for launches, campaigns and design presentations.',
    tags: ['HERO IMAGES', 'DETAIL SHOTS', 'CG ANIMATION'],
    deliverables: 'Hero stills, close-up details and cinematic sequences, scoped to the campaign.',
    process: 'Vehicle & brief → camera & look development → final delivery',
    project: { title: 'After Hours', type: 'Automotive lighting study', description: 'A fictional grand tourer defined by graphite surfaces, precise reflections and a restrained red accent.', image: 'automotive', alt: 'Graphite coupe in a dark studio with reflected strip lighting', concept: true }
  },
  {
    num: '03', title: 'Visual\nStorytelling', short: 'A clear idea. A lasting impression.',
    body: 'Short visual narratives built around a strong idea. From the first frame to the final edit, composition, camera movement and pacing work together to give a film its own atmosphere.',
    tags: ['CONCEPT FILMS', 'STORYBOARDS', 'EDITING'],
    deliverables: 'Storyboards, cinematic style frames and short films with agreed delivery formats.',
    process: 'Idea & narrative → storyboard & animatic → film & finishing',
    project: { title: 'The Threshold', type: 'Narrative style frame', description: 'A solitary figure and a monumental opening establish scale, anticipation and the beginning of a journey.', image: 'storytelling', alt: 'Lone traveller facing a monumental circular opening in misty architecture', concept: true }
  },
  {
    num: '04', title: 'Look Development\n& Lighting', short: 'Materials that feel real. Light with intent.',
    body: 'The visual foundation of a convincing CG image. Materials, surface response and lighting are developed together, with practical scene reviews to keep the look consistent through production.',
    tags: ['MATERIALS', 'LIGHTING', 'SCENE REVIEW'],
    deliverables: 'Material and lighting studies, a defined scene look and actionable technical feedback.',
    process: 'Asset review → material & lighting tests → approved look',
    project: { title: 'Matter / Light', type: 'Surface and reflection study', description: 'Brushed metal, smoked glass and basalt reveal how different surfaces respond to the same light.', image: 'lookdev', alt: 'Brushed metal torus, smoked glass sphere and rough basalt cube in grazing light', concept: true }
  },
  {
    num: '05', title: 'Art Direction\n& Visual Systems', short: 'One visual language. Every frame aligned.',
    body: 'A coherent visual direction for brands and campaigns. References, palettes and composition rules become a practical framework that keeps individual images connected across a series.',
    tags: ['CAMPAIGN DIRECTION', 'STYLE FRAMES', 'VISUAL GUIDELINES'],
    deliverables: 'A creative direction, key style frames and a concise visual guide for production.',
    process: 'Brand & audience → visual territories → direction & guidelines',
    project: { title: 'Obsidian', type: 'Product campaign direction', description: 'A fictional fragrance world built from dark sculpture, warm stone and a single burgundy accent.', image: 'direction', alt: 'Sculptural black fragrance bottle with silver cap, travertine and burgundy glass', concept: true }
  }
];
