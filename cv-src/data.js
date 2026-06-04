(function () {
  const shared = {
    contact: {
      email: 'jesus.cgalaviz@gmail.com',
      phone: '+52 442 189 6413',
      phoneHref: 'tel:+524421896413',
      github: { text: 'github.com/jechaviz', url: 'https://github.com/jechaviz' },
      linkedin: { text: 'linkedin.com/in/jechaviz', url: 'https://www.linkedin.com/in/jechaviz/' }
    },
    skills: [
      'AHK 2', 'Amazon API Gateway', 'Amazon Bedrock', 'Amazon Connect', 'Angular',
      'Ansible', 'AWS CloudWatch', 'AWS EKS', 'AWS Lambda', 'Bash', 'Bootstrap',
      'C', 'CI/CD', 'CloudFormation', 'Confluence', 'Cross-Functional Leadership',
      'CSS3', 'DaisyUI', 'DDD', 'Django', 'ERP Integrations', 'Odoo', 'BAAN',
      'Billing Automation', 'Idempotency', 'Financial Traceability', 'LoE / Gantt',
      'SDLC Estimation'
    ],
    stack: [
      { id: 'cloud', items: ['Amazon Bedrock', 'Amazon Connect', 'API Gateway', 'CloudFormation', 'CloudWatch', 'Lambda', 'EKS'] },
      { id: 'frontend', items: ['Vue 3', 'React', 'Angular', 'React Native', 'Flutter', 'CSS3', 'Bootstrap', 'DaisyUI'] },
      { id: 'backend', items: ['Java', 'Spring Boot', 'Python', 'Laravel', 'Django', 'GraphQL', 'REST', 'SOAP', 'Redis'] },
      { id: 'enterprise', items: ['Odoo', 'BAAN', 'ERP bridges', 'Billing workflows', 'Operational traceability'] },
      { id: 'delivery', items: ['CI/CD', 'Ansible', 'Bash', 'DDD', 'Confluence', 'Agile', 'Splunk'] }
    ],
    links: [
      { id: 'email', href: 'mailto:jesus.cgalaviz@gmail.com', icon: 'fa-solid fa-envelope' },
      { id: 'github', href: 'https://github.com/jechaviz', icon: 'fa-brands fa-github' },
      { id: 'linkedin', href: 'https://www.linkedin.com/in/jechaviz/', icon: 'fa-brands fa-linkedin' }
    ],
    experienceBase: [
      { id: 'yeaip', company: 'YEAIP SOLUCIONES SA DE CV', locationId: 'qroQro', from: '02/2026', current: true },
      { id: 'upwork', company: 'Upwork Freelancer', locationId: 'remote', from: '04/2024', current: true },
      { id: 'persistent', company: 'Persistent Systems SA de CV', locationId: 'qroQro', from: '11/2025', to: '01/2026' },
      { id: 'petco', company: 'Petco México', locationId: 'mexico', from: '10/2023', to: '04/2024' },
      { id: 'tcsLeader', company: 'Tata Consultancy Services', locationId: 'mexico', from: '01/2023', to: '10/2023' },
      { id: 'tcsConsultant', company: 'Tata Consultancy Services', locationId: 'qroMexico', from: '08/2021', to: '12/2022' },
      { id: 'terapixel', company: 'Terapixel S.A de C.V', locationId: 'qroMexico', from: '02/2014', to: '01/2021' },
      { id: 'tralixEngineer', company: 'Tralix Mexico S. de R.L. de C.V.', locationId: 'mexico', from: '08/2013', to: '01/2014' },
      { id: 'independentTeacher', company: 'Independent', locationId: 'qroMexico', from: '01/1997', to: '02/2013' },
      { id: 'tralixEducation', company: 'Tralix Mexico S. de R.L. de C.V.', locationId: 'qroMexico', from: '06/2010', to: '10/2012' }
    ]
  };

  const en = {
    localeMeta: { label: 'English', short: 'EN' },
    meta: {
      title: 'Jesus Chavez Galaviz | Senior Software Engineering Leader',
      description: 'Professional CV for Jesus Chavez Galaviz, senior software engineering leader and full-stack architect.'
    },
    identity: { name: 'Jesus Chavez Galaviz', role: 'Senior Engineering Leader', location: 'Queretaro, Mexico' },
    actions: { print: 'Print / PDF', languageLabel: 'CV language' },
    sections: {
      contact: 'Contact', strengths: 'Core Strengths', stack: 'Selected Stack',
      education: 'Education', language: 'Language', experience: 'Experience',
      timeline: 'Professional Timeline', skills: 'Application Skill Set',
      caseStudies: 'Selected Delivery Case Studies'
    },
    labels: { current: 'Current', present: 'Present' },
    education: { degree: 'Bachelors, Computer Engineering', period: '2021 - 2022', gpa: 'GPA 9.78' },
    language: { name: 'English', level: 'Fluent' },
    hero: {
      badges: ['Target: Senior Manager, Software Engineering', 'Full Stack + People Manager'],
      title: 'Full-stack architecture, cloud delivery, and engineering teams that actually ship.',
      summary: 'I am a software engineering leader and multi-stack architect with hands-on depth across Java, Python, JavaScript ecosystems, cloud platforms, integrations, and AI-enabled workflows. I build teams, define technical direction, remove delivery blockers, and turn ambiguous product goals into working systems.'
    },
    metrics: [
      { value: '407', label: 'hour max forecast modeled for RP Rental with explicit 10% reserve' },
      { value: '30', label: 'people I hired and organized for a Visa delivery initiative' },
      { value: '8', label: 'developers I led in a team I founded at Petco Mexico' }
    ],
    strengths: ['People management', 'Architecture', 'AI workflows', 'Cloud platforms', 'Full-stack delivery', 'Product direction', 'Technical debt', 'Security practices'],
    stackLabels: { cloud: 'Cloud / AI', frontend: 'Frontend / Mobile', backend: 'Backend / Integration', enterprise: 'Enterprise / ERP', delivery: 'Delivery' },
    linkLabels: { email: 'Email', github: 'GitHub', linkedin: 'LinkedIn' },
    locations: { qroQro: 'Queretaro, QRO', remote: 'Remote', mexico: 'Mexico', qroMexico: 'Queretaro, Mexico' },
    experience: {
      yeaip: { title: 'Innovation Director', summary: 'I lead company growth, create new internal capabilities, and expand the product catalog with innovative solutions. Recent work includes RP Rental Phase 2: Odoo-BAAN integration, cutoff/return billing logic, financial traceability, SDLC-level estimation, and an executable delivery Gantt.', tags: ['AI workflows', 'Odoo-BAAN', 'Billing automation', 'LoE / Gantt'] },
      upwork: { title: 'Full Multistack Architect and Technical Lead', summary: 'I lead and unblock client projects for DFX5, Antamina, Allcallsio, and Taoti Creative across Flutter, React Native, Python, Laravel, Vue 3, GraphQL, REST, Redis, Java, and AWS services.', tags: ['Architecture', 'Vue 3', 'AWS', 'GraphQL', 'React Native'] },
      persistent: { title: 'IT Manager', summary: 'I hired 30 people, defined working rules, organized task ownership, and prepared development, documentation, scrum, reporting, KPI, and internal course environments for a Visa project that was later cancelled.', tags: ['Hiring', 'Delivery operations', 'Scrum', 'KPIs'] },
      petco: { title: 'TI Manager', summary: 'I founded and managed a team of 8 developers, owned hiring and team culture, set technical direction, introduced best practices, managed technical debt and security, and aligned product roadmaps with stakeholder expectations.', tags: ['Team building', 'Product management', 'Security', 'Automation'] },
      tcsLeader: { title: 'Team Leader', summary: 'I served as Splunk Team Leader and Developer for Morgan Stanley, covering Bash scripting, API development, Python scripting, Splunk log analysis, and dashboard creation with vanilla JavaScript, CSS, and HTML.', tags: ['Splunk', 'Python', 'Bash', 'Dashboards'] },
      tcsConsultant: { title: 'Senior Consultant', summary: 'I delivered API and full-stack development for Bank of New York Mellon using microservices, Java 11, Spring Boot, CI, Docker, documentation, Agile practices, TypeScript, JavaScript, Angular, and React.', tags: ['Java 11', 'Spring Boot', 'Docker', 'Angular', 'React'] },
      terapixel: { title: 'From Developer to CTO', summary: 'I created the core product used by the company and supported direct and third-party customers including Gpo Carso, Tralix, Yamaha, MercadoLibre, MaryKay, Zapaterias Pakar, El Economista, Banamex, Flecha Amarilla, and Fandeli.', tags: ['CTO path', 'Java 8', 'Spring', 'Node.js', 'React', 'Vue', 'Angular'] },
      tralixEngineer: { title: 'Java Developer & Integration Engineer', summary: 'I developed and integrated REST, SOAP, TEXT, and ERP solutions for invoicing and email platforms, implementing integration protocols and backend engineering workflows.', tags: ['Java', 'REST', 'SOAP', 'ERP integrations'] },
      independentTeacher: { title: 'Math, Physics, Chemistry, Computing, Literature & English Teacher', summary: 'I designed and taught accelerated learning methods across sciences and language, helping students achieve strong outcomes in multiple technical and academic subjects.', tags: ['Teaching', 'Learning design', 'Sciences', 'English'] },
      tralixEducation: { title: 'Education Manager', summary: 'I designed and delivered certification programs, video courses, technical manuals, and whitepapers. I managed an intranet and Moodle-based classroom for national partner training.', tags: ['Training', 'Moodle', 'Documentation', 'Certifications'] }
    },
    caseStudies: [
      {
        title: 'RP Rental Phase 2 - Odoo-BAAN billing integration',
        context: 'Executive proposal and delivery model for rental asset billing, returns, financial-state synchronization, and operational traceability.',
        impact: 'Converted an ambiguous billing problem into four verifiable workstreams: cutoff billing, smart returns, BAAN synchronization, and expandable history inside Odoo.',
        metrics: ['370 hrs base', '+37 hrs reserve', '8-week recommended plan'],
        tags: ['Odoo', 'BAAN', 'Billing logic', 'Idempotency', 'Financial traceability', 'SDLC estimation']
      }
    ]
  };

  const es = {
    localeMeta: { label: 'Español', short: 'ES' },
    meta: {
      title: 'Jesus Chavez Galaviz | Líder Senior de Ingeniería de Software',
      description: 'CV profesional de Jesus Chavez Galaviz, líder senior de ingeniería de software y arquitecto full-stack.'
    },
    identity: { name: 'Jesus Chavez Galaviz', role: 'Líder Senior de Ingeniería', location: 'Querétaro, México' },
    actions: { print: 'Imprimir / PDF', languageLabel: 'Idioma del CV' },
    sections: {
      contact: 'Contacto', strengths: 'Fortalezas Clave', stack: 'Stack Seleccionado',
      education: 'Educación', language: 'Idioma', experience: 'Experiencia',
      timeline: 'Trayectoria Profesional', skills: 'Habilidades de la Aplicación',
      caseStudies: 'Casos de entrega seleccionados'
    },
    labels: { current: 'Actual', present: 'Presente' },
    education: { degree: 'Licenciatura, Ingeniería en Computación', period: '2021 - 2022', gpa: 'Promedio 9.78' },
    language: { name: 'Inglés', level: 'Fluido' },
    hero: {
      badges: ['Objetivo: Senior Manager, Software Engineering', 'Full Stack + Gestión de Personas'],
      title: 'Arquitectura full-stack, entrega cloud y equipos de ingeniería que sí ponen sistemas en producción.',
      summary: 'Soy líder de ingeniería de software y arquitecto multi-stack con profundidad práctica en Java, Python, ecosistemas JavaScript, plataformas cloud, integraciones y flujos de trabajo con IA. Construyo equipos, defino dirección técnica, desbloqueo entregas y convierto objetivos ambiguos de producto en sistemas funcionando.'
    },
    metrics: [
      { value: '407', label: 'horas de forecast máximo modeladas para RP Rental con reserva explícita de 10%' },
      { value: '30', label: 'personas que contraté y organicé para una iniciativa de entrega con Visa' },
      { value: '8', label: 'desarrolladores que lideré en un equipo que fundé en Petco México' }
    ],
    strengths: ['Gestión de personas', 'Arquitectura', 'Flujos con IA', 'Plataformas cloud', 'Entrega full-stack', 'Dirección de producto', 'Deuda técnica', 'Prácticas de seguridad'],
    stackLabels: { cloud: 'Cloud / IA', frontend: 'Frontend / Mobile', backend: 'Backend / Integración', enterprise: 'Enterprise / ERP', delivery: 'Entrega' },
    linkLabels: { email: 'Email', github: 'GitHub', linkedin: 'LinkedIn' },
    locations: { qroQro: 'Querétaro, QRO', remote: 'Remoto', mexico: 'México', qroMexico: 'Querétaro, México' },
    experience: {
      yeaip: { title: 'Director de Innovación', summary: 'Lidero el crecimiento de la empresa, creo nuevas capacidades internas y amplío el catálogo de productos con soluciones innovadoras. Trabajo reciente: RP Rental Fase 2 con integración Odoo-BAAN, lógica de facturación por corte/retornos, trazabilidad financiera, estimación SDLC y Gantt ejecutable.', tags: ['Flujos con IA', 'Odoo-BAAN', 'Automatización de facturación', 'LoE / Gantt'] },
      upwork: { title: 'Arquitecto Multistack Full y Líder Técnico', summary: 'Lidero y desbloqueo proyectos para DFX5, Antamina, Allcallsio y Taoti Creative en Flutter, React Native, Python, Laravel, Vue 3, GraphQL, REST, Redis, Java y servicios AWS.', tags: ['Arquitectura', 'Vue 3', 'AWS', 'GraphQL', 'React Native'] },
      persistent: { title: 'Gerente de TI', summary: 'Contraté 30 personas, definí reglas de trabajo, organicé ownership de tareas y preparé entornos de desarrollo, documentación, scrum, reportes, KPI y cursos internos para un proyecto con Visa que después fue cancelado.', tags: ['Contratación', 'Operación de entrega', 'Scrum', 'KPIs'] },
      petco: { title: 'Gerente de TI', summary: 'Fundé y gestioné un equipo de 8 desarrolladores, llevé contratación y cultura de equipo, definí dirección técnica, introduje mejores prácticas, gestioné deuda técnica y seguridad, y alineé roadmaps de producto con stakeholders.', tags: ['Construcción de equipo', 'Gestión de producto', 'Seguridad', 'Automatización'] },
      tcsLeader: { title: 'Líder de Equipo', summary: 'Trabajé como líder de equipo y desarrollador Splunk para Morgan Stanley, cubriendo scripting Bash, desarrollo de APIs, scripting Python, análisis de logs en Splunk y creación de dashboards con JavaScript vanilla, CSS y HTML.', tags: ['Splunk', 'Python', 'Bash', 'Dashboards'] },
      tcsConsultant: { title: 'Consultor Senior', summary: 'Entregué desarrollo de APIs y full-stack para Bank of New York Mellon con microservicios, Java 11, Spring Boot, CI, Docker, documentación, prácticas Agile, TypeScript, JavaScript, Angular y React.', tags: ['Java 11', 'Spring Boot', 'Docker', 'Angular', 'React'] },
      terapixel: { title: 'De Desarrollador a CTO', summary: 'Creé el producto central usado por la compañía y apoyé clientes directos y de terceros como Gpo Carso, Tralix, Yamaha, MercadoLibre, MaryKay, Zapaterías Pakar, El Economista, Banamex, Flecha Amarilla y Fandeli.', tags: ['Ruta a CTO', 'Java 8', 'Spring', 'Node.js', 'React', 'Vue', 'Angular'] },
      tralixEngineer: { title: 'Desarrollador Java e Ingeniero de Integraciones', summary: 'Desarrollé e integré soluciones REST, SOAP, TEXT y ERP para plataformas de facturación y correo, implementando protocolos de integración y flujos de ingeniería backend.', tags: ['Java', 'REST', 'SOAP', 'Integraciones ERP'] },
      independentTeacher: { title: 'Profesor de Matemáticas, Física, Química, Computación, Literatura e Inglés', summary: 'Diseñé y enseñé métodos de aprendizaje acelerado en ciencias e idiomas, ayudando a estudiantes a lograr resultados sólidos en múltiples materias técnicas y académicas.', tags: ['Docencia', 'Diseño de aprendizaje', 'Ciencias', 'Inglés'] },
      tralixEducation: { title: 'Gerente de Educación', summary: 'Diseñé e impartí programas de certificación, video cursos, manuales técnicos y whitepapers. Gestioné una intranet y aula basada en Moodle para capacitación nacional de partners.', tags: ['Capacitación', 'Moodle', 'Documentación', 'Certificaciones'] }
    },
    caseStudies: [
      {
        title: 'RP Rental Fase 2 - Integración de facturación Odoo-BAAN',
        context: 'Propuesta ejecutiva y modelo de entrega para facturación de renta de activos, retornos, sincronización de estados financieros y trazabilidad operativa.',
        impact: 'Convertí un problema ambiguo de facturación en cuatro frentes verificables: facturación por corte, retornos inteligentes, sincronización BAAN e historial expandible dentro de Odoo.',
        metrics: ['370 h base', '+37 h reserva', 'plan recomendado de 8 semanas'],
        tags: ['Odoo', 'BAAN', 'Lógica de facturación', 'Idempotencia', 'Trazabilidad financiera', 'Estimación SDLC']
      }
    ]
  };

  window.CV_DATA = {
    shared,
    locales: { en, es },
    fallbackLocale: 'en',
    storageKey: 'jcg-cv-locale'
  };
})();
