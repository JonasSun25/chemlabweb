export interface GlasswareItem {
  id: string;
  name: string;
  image: string;
  shortUse: string;
  description: string;
  materialProperties: {
    material: string;
    thermalResistance: string;
    chemicalResistance: string;
    maxTemp: string;
  };
  usageInstructions: string[];
  safetyWarnings: string[];
}

const getImagePath = (filename: string) => `/figures/glasswares/${filename}`;

export const glasswareData: Record<string, GlasswareItem> = {
  '圆底烧瓶 Round-bottom Flask': {
    id: 'round-bottom-flask',
    name: '圆底烧瓶 Round-bottom Flask',
    image: getImagePath('01_圆底烧瓶.png'),
    shortUse: '回流、蒸馏、反应',
    description: '圆底烧瓶是有机化学中最常用的反应容器之一。其球形设计能够均匀分布热量，承受高真空压力，适用于各种加热反应、回流和蒸馏操作。多颈设计允许同时安装搅拌器、温度计、冷凝管和滴液漏斗，是进行复杂反应的理想选择。',
    materialProperties: {
      material: '高硼硅酸盐玻璃 (Borosilicate Glass)',
      thermalResistance: '优异，可承受剧烈温度变化',
      chemicalResistance: '优秀，耐大多数酸碱和有机溶剂',
      maxTemp: '约 400°C',
    },
    usageInstructions: [
      '使用前检查瓶身有无裂纹或破损',
      '加热时必须使用石棉网或加热套',
      '液体体积不超过瓶容积的 2/3',
      '使用软木环或夹具固定，避免直接接触硬表面',
      '真空操作前确保瓶壁厚度均匀',
    ],
    safetyWarnings: [
      '禁止直接放在热板或桌面上冷却',
      '高温状态下避免接触冷水或冷表面',
      '真空抽取时确保瓶身无缺陷',
      '高压反应需使用防护罩',
    ],
  },
  '梨形瓶 Pear-shaped Flask': {
    id: 'pear-shaped-flask',
    name: '梨形瓶 Pear-shaped Flask',
    image: getImagePath('02_梨形瓶.png'),
    shortUse: '旋转蒸发接收、结晶',
    description: '梨形瓶底部呈尖锥状，便于集中和转移微量产物。是旋转蒸发仪的标准接收器，也常用于微量反应和结晶操作。其设计使最后残留液体易于用注射器吸出。',
    materialProperties: {
      material: '高硼硅酸盐玻璃',
      thermalResistance: '良好',
      chemicalResistance: '优秀',
      maxTemp: '约 400°C',
    },
    usageInstructions: [
      '适用于微量和半微量反应',
      '旋转蒸发时固定牢固',
      '结晶时保持适当冷却速度',
    ],
    safetyWarnings: [
      '避免快速温度变化',
      '真空操作时检查瓶身完整性',
    ],
  },
  '三口烧瓶 Three-neck Flask': {
    id: 'three-neck-flask',
    name: '三口烧瓶 Three-neck Flask',
    image: getImagePath('03_三口烧瓶.png'),
    shortUse: '同时安装冷凝管+温度计+导气管，多用于氮气保护反应',
    description: '三口烧瓶具有多个颈部开口，可同时安装搅拌器、温度计、冷凝管和滴液漏斗。专为需要氮气保护或惰性气体保护的反应设计，是进行无水无氧反应的标准反应器。',
    materialProperties: {
      material: '高硼硅酸盐玻璃',
      thermalResistance: '优异',
      chemicalResistance: '优秀',
      maxTemp: '约 400°C',
    },
    usageInstructions: [
      '中间颈通常安装搅拌器',
      '侧颈可根据需要安装温度计、冷凝管或滴液漏斗',
      '使用前需进行干燥和脱气处理',
      '确保所有接口密封良好',
    ],
    safetyWarnings: [
      '检查所有磨口接口是否匹配',
      '氮气气流需缓慢稳定',
      '反应过程中保持气体流通',
    ],
  },
  '烧杯 Beaker': {
    id: 'beaker',
    name: '烧杯 Beaker',
    image: getImagePath('04_烧杯.png'),
    shortUse: '溶解、配溶液、结晶等',
    description: '烧杯是最常用的实验室容器之一。直筒设计便于观察液位和搅拌，广泛用于溶解固体、配制溶液、加热温和反应和结晶操作。有多种规格可选。',
    materialProperties: {
      material: '高硼硅酸盐玻璃',
      thermalResistance: '良好',
      chemicalResistance: '优秀',
      maxTemp: '约 400°C',
    },
    usageInstructions: [
      '使用石棉网加热',
      '不可直接加热超过 500mL 的烧杯',
      '搅拌时使用玻璃棒',
      '倾倒时使用玻璃棒引流',
    ],
    safetyWarnings: [
      '热烧杯避免接触冷表面',
      '大量液体加热时注意暴沸',
    ],
  },
  '锥形瓶 Conical Flask': {
    id: 'conical-flask',
    name: '锥形瓶 Conical Flask',
    image: getImagePath('05_锥形瓶.png'),
    shortUse: '收集溶液、振荡反应',
    description: '锥形瓶（又称锥形瓶或爱伦美瓶）底部宽大稳定，便于振荡混匀，是滴定和溶液储存的理想容器。但其平底设计不适合承受真空。',
    materialProperties: {
      material: '高硼硅酸盐玻璃',
      thermalResistance: '良好',
      chemicalResistance: '优秀',
      maxTemp: '约 400°C',
    },
    usageInstructions: [
      '滴定时握持瓶颈振荡',
      '可用于短时间加热',
      '储存溶液时塞紧瓶塞',
    ],
    safetyWarnings: [
      '禁止抽真空',
      '加热时使用石棉网',
    ],
  },
  '试管': {
    id: 'test-tube',
    name: '试管',
    image: getImagePath('06_试管.png'),
    shortUse: '小规模反应、试剂反应',
    description: '试管是进行小规模反应和定性分析的必备工具。操作简便，用量少，适合探索性反应和试剂筛选。',
    materialProperties: {
      material: '高硼硅酸盐玻璃',
      thermalResistance: '良好',
      chemicalResistance: '良好',
      maxTemp: '约 400°C',
    },
    usageInstructions: [
      '倾斜约45度加热',
      '试管口不对人',
      '使用试管夹夹持',
    ],
    safetyWarnings: [
      '加热时试管口勿对人',
      '易燃溶剂使用时远离火源',
    ],
  },
  '试剂瓶': {
    id: 'reagent-bottle',
    name: '试剂瓶',
    image: getImagePath('07_试剂瓶.png'),
    shortUse: '储存试剂',
    description: '试剂瓶用于储存固体和液体试剂。琥珀色瓶可阻挡光线，保护光敏感物质。',
    materialProperties: {
      material: '高硼硅酸盐玻璃或钠钙玻璃',
      thermalResistance: '一般',
      chemicalResistance: '良好',
      maxTemp: '约 200°C',
    },
    usageInstructions: [
      '密封保存',
      '光敏试剂使用琥珀色瓶',
      '定期检查瓶塞完整性',
    ],
    safetyWarnings: [
      '易挥发试剂存放在通风处',
      '易燃试剂远离热源',
    ],
  },
  '分液漏斗 Separatory Funnel': {
    id: 'separatory-funnel',
    name: '分液漏斗 Separatory Funnel',
    image: getImagePath('08_分液漏斗.png'),
    shortUse: '液-液萃取、洗涤',
    description: '分液漏斗是进行液-液萃取的核心工具。通过密度差异分离互不相溶的液体，配合分液漏斗架使用效果更佳。',
    materialProperties: {
      material: '高硼硅酸盐玻璃',
      thermalResistance: '良好',
      chemicalResistance: '优秀',
      maxTemp: '约 400°C',
    },
    usageInstructions: [
      '检查活塞是否润滑密封',
      '萃取前排气泄压',
      '分层清晰后再分液',
      '下层液体从活塞放出',
    ],
    safetyWarnings: [
      '频繁打开活塞排气',
      '压力过大时立即停止',
      '有毒溶剂在通风橱操作',
    ],
  },
  '恒压滴液漏斗 Pressure-equalizing Dropping Funnel': {
    id: 'addition-funnel',
    name: '恒压滴液漏斗 Pressure-equalizing Dropping Funnel',
    image: getImagePath('09_恒压滴液漏斗.png'),
    shortUse: '逐滴添加试剂，敏感试剂',
    description: '恒压滴液漏斗带有平衡气压侧管，使漏斗内压力与反应瓶一致。适用于无水无氧系统中的试剂滴加，可精确控制滴加速度。',
    materialProperties: {
      material: '高硼硅酸盐玻璃',
      thermalResistance: '良好',
      chemicalResistance: '优秀',
      maxTemp: '约 400°C',
    },
    usageInstructions: [
      '确保平衡管畅通',
      '滴加速度根据反应调节',
      '滴加完毕后惰性气体置换',
    ],
    safetyWarnings: [
      '检查所有接口密封性',
      '剧烈反应时缓慢滴加',
    ],
  },
  '砂芯漏斗 Fritted Funnel': {
    id: 'fritted-funnel',
    name: '砂芯漏斗 Fritted Funnel',
    image: getImagePath('10_砂芯漏斗.png'),
    shortUse: '真空过滤',
    description: '砂芯漏斗内置烧结玻璃滤板，用于真空过滤。可重复使用，适用于过滤中等颗粒大小的固体。',
    materialProperties: {
      material: '高硼硅酸盐玻璃',
      thermalResistance: '良好',
      chemicalResistance: '良好',
      maxTemp: '约 200°C',
    },
    usageInstructions: [
      '使用前用溶剂预湿',
      '真空度适中',
      '过滤完毕清洗干净',
    ],
    safetyWarnings: [
      '滤板破损禁止使用',
      '避免突然加压',
    ],
  },
  '普通漏斗 Funnel': {
    id: 'funnel',
    name: '普通漏斗 Funnel',
    image: getImagePath('11_普通漏斗.png'),
    shortUse: '转移固体/液体',
    description: '普通漏斗用于固体和液体的转移。是实验室最基本的操作工具之一。',
    materialProperties: {
      material: '高硼硅酸盐玻璃',
      thermalResistance: '良好',
      chemicalResistance: '良好',
      maxTemp: '约 400°C',
    },
    usageInstructions: [
      '使用滤纸时湿润贴壁',
      '固体转移时使用',
      '液体引流时使用',
    ],
    safetyWarnings: [
      '热液体避免使用塑料漏斗',
    ],
  },
  '布氏漏斗 Büchner Funnel': {
    id: 'buchner-funnel',
    name: '布氏漏斗 Büchner Funnel',
    image: getImagePath('12_布氏漏斗.png'),
    shortUse: '大量固液分离，需配合抽滤瓶使用',
    description: '布氏漏斗用于大量固液分离。配合抽滤瓶和真空源使用，是重结晶产物过滤的标准工具。',
    materialProperties: {
      material: '高硼硅酸盐玻璃',
      thermalResistance: '良好',
      chemicalResistance: '良好',
      maxTemp: '约 400°C',
    },
    usageInstructions: [
      '铺好滤纸并湿润',
      '真空度逐渐增加',
      '洗涤沉淀时暂停真空',
    ],
    safetyWarnings: [
      '滤板破损禁止使用',
      '抽滤瓶需坚固',
    ],
  },
  '直形冷凝管 Straight Condenser': {
    id: 'straight-condenser',
    name: '直形冷凝管 Straight Condenser',
    image: getImagePath('17_直形冷凝管.png'),
    shortUse: '低沸点溶剂蒸馏，下口进冷水，上口出',
    description: '直形冷凝管内管笔直，蒸汽流动阻力小。主要用于蒸馏低沸点溶剂，冷却水从下方进入，上方流出。',
    materialProperties: {
      material: '高硼硅酸盐玻璃',
      thermalResistance: '良好',
      chemicalResistance: '优秀',
      maxTemp: '约 400°C',
    },
    usageInstructions: [
      '冷却水从下口进，上口出',
      '蒸馏低沸点溶剂',
      '确保所有接口密封',
    ],
    safetyWarnings: [
      '防止冷却水溢出',
      '高温时避免冷水溅入',
    ],
  },
  '球形冷凝管 Ball Condenser': {
    id: 'ball-condenser',
    name: '球形冷凝管 Ball Condenser',
    image: getImagePath('18_球形冷凝管.png'),
    shortUse: '回流操作标配',
    description: '球形冷凝管具有多个球形结构，冷却面积大，是回流反应的标准配置。内管可拆卸清洗。',
    materialProperties: {
      material: '高硼硅酸盐玻璃',
      thermalResistance: '良好',
      chemicalResistance: '优秀',
      maxTemp: '约 400°C',
    },
    usageInstructions: [
      '冷却水从下口进，上口出',
      '长时间回流时检查水位',
      '反应结束后先关冷却水',
    ],
    safetyWarnings: [
      '确保冷却水循环正常',
      '回流结束后防止倒吸',
    ],
  },
  '空气冷凝管 Air Condenser': {
    id: 'air-condenser',
    name: '空气冷凝管 Air Condenser',
    image: getImagePath('19_空气冷凝管.png'),
    shortUse: '中等沸点溶剂蒸馏，靠空气冷却',
    description: '空气冷凝管不使用冷却水，依靠空气冷却。适用于中等沸点溶剂的蒸馏和回流。',
    materialProperties: {
      material: '高硼硅酸盐玻璃',
      thermalResistance: '良好',
      chemicalResistance: '优秀',
      maxTemp: '约 400°C',
    },
    usageInstructions: [
      '无需连接水源',
      '适用于沸点 150°C 以上溶剂',
      '保持通风良好',
    ],
    safetyWarnings: [
      '冷却效果有限，注意安全',
    ],
  },
  '温度计 Thermometer': {
    id: 'thermometer',
    name: '温度计 Thermometer',
    image: getImagePath('13_温度计.png'),
    shortUse: '监测反应/蒸馏温度',
    description: '温度计用于监测反应和蒸馏过程中的温度。汞温度计精度高，电子温度计使用方便。',
    materialProperties: {
      material: '玻璃/汞或电子元件',
      thermalResistance: '根据类型',
      chemicalResistance: '需根据测量介质选择',
      maxTemp: '根据类型',
    },
    usageInstructions: [
      '校准后使用',
      '正确插入反应体系',
      '避免触碰瓶壁或加热元件',
    ],
    safetyWarnings: [
      '汞温度计破损需谨慎处理',
      '电子温度计注意防水',
    ],
  },
  '量筒 Graduated Cylinder': {
    id: 'graduated-cylinder',
    name: '量筒 Graduated Cylinder',
    image: getImagePath('14_量筒.png'),
    shortUse: '量取液体体积；不可加热',
    description: '量筒用于精确量取液体体积。读取液面读数时视线需与刻度平齐。',
    materialProperties: {
      material: '钠钙玻璃或高硼硅玻璃',
      thermalResistance: '差',
      chemicalResistance: '良好',
      maxTemp: '约 100°C',
    },
    usageInstructions: [
      '读取弯月面底部刻度',
      '保持量筒垂直',
      '不可用于加热',
    ],
    safetyWarnings: [
      '禁止加热',
      '热液体冷却后再量取',
    ],
  },
  '容量瓶 Volumetric Flask': {
    id: 'volumetric-flask',
    name: '容量瓶 Volumetric Flask',
    image: getImagePath('15_容量瓶.png'),
    shortUse: '配制标准浓度溶液',
    description: '容量瓶用于配制精确浓度的标准溶液。定容时需注意温度和弯月面。',
    materialProperties: {
      material: '高硼硅酸盐玻璃',
      thermalResistance: '差',
      chemicalResistance: '优秀',
      maxTemp: '约 100°C',
    },
    usageInstructions: [
      '使用前用待装溶液润洗',
      '定容时使用弯月面',
      '摇匀时注意密封',
    ],
    safetyWarnings: [
      '禁止加热',
      '长期存放需定期检查刻度',
    ],
  },
  '移液器': {
    id: 'pipette',
    name: '移液器',
    image: getImagePath('16_移液器.png'),
    shortUse: '精确量取液体',
    description: '移液器用于精确量取微量液体。分为手动移液器和电子移液器。',
    materialProperties: {
      material: '塑料/玻璃',
      thermalResistance: '一般',
      chemicalResistance: '需根据材质选择',
      maxTemp: '根据材质',
    },
    usageInstructions: [
      '正确吸液和放液',
      '使用后校准',
      '保持垂直操作',
    ],
    safetyWarnings: [
      '避免腐蚀性液体',
      '使用后妥善处理废液',
    ],
  },
  '橡胶塞': {
    id: 'rubber-stopper',
    name: '橡胶塞',
    image: getImagePath('20_橡胶塞.png'),
    shortUse: '密封容器、隔绝空气',
    description: '橡胶塞是实验室常用的密封材料，用于密封试剂瓶、反应瓶等容器。根据孔数分为单孔、双孔、三孔等类型。',
    materialProperties: {
      material: '合成橡胶/硅胶',
      thermalResistance: '一般（硅胶可达 200°C）',
      chemicalResistance: '需根据试剂选择，部分有机溶剂会使橡胶溶胀',
      maxTemp: '约 100-200°C（根据材质）',
    },
    usageInstructions: [
      '选择合适的孔径',
      '使用前检查是否有裂纹',
      '可配合玻璃管使用',
      '长期不使用应清洗干净保存',
    ],
    safetyWarnings: [
      '避免接触强酸强碱',
      '有机溶剂可能导致溶胀',
      '高温时注意变形',
    ],
  },
  '玻璃塞': {
    id: 'glass-stopper',
    name: '玻璃塞',
    image: getImagePath('21_玻璃塞.png'),
    shortUse: '密封试剂瓶、防止挥发',
    description: '玻璃塞是试剂瓶的标配密封部件，与瓶口磨砂配合形成良好的密封效果。适用于需要长期储存的试剂。',
    materialProperties: {
      material: '高硼硅酸盐玻璃',
      thermalResistance: '良好',
      chemicalResistance: '优秀',
      maxTemp: '约 400°C',
    },
    usageInstructions: [
      '保持磨砂面清洁',
      '使用时旋转插入',
      '不可强行撬开',
      '配套使用，不要混用',
    ],
    safetyWarnings: [
      '破裂的玻璃塞禁止使用',
      '强行打开可能导致瓶身破裂',
    ],
  },
  '滴管': {
    id: 'dropper',
    name: '滴管',
    image: getImagePath('22_滴管.png'),
    shortUse: '逐滴添加试剂、转移少量液体',
    description: '滴管用于精确转移少量液体，是滴加试剂的常用工具。分为玻璃滴管和塑料滴管。',
    materialProperties: {
      material: '玻璃或塑料',
      thermalResistance: '一般',
      chemicalResistance: '需根据材质选择',
      maxTemp: '根据材质',
    },
    usageInstructions: [
      '使用前清洗干净',
      '滴加时保持垂直',
      '不可混用不同试剂的滴管',
      '用后及时清洗',
    ],
    safetyWarnings: [
      '避免交叉污染',
      '腐蚀性液体使用专用滴管',
    ],
  },
  '洗瓶': {
    id: 'wash-bottle',
    name: '洗瓶',
    image: getImagePath('23_洗瓶.png'),
    shortUse: '清洗容器、冲洗沉淀',
    description: '洗瓶用于储存纯水或溶剂，按压瓶身可喷出细液流，用于清洗容器内壁或转移少量液体。',
    materialProperties: {
      material: 'PE塑料瓶+PP/PE瓶盖',
      thermalResistance: '差',
      chemicalResistance: '需根据储存溶剂选择材质',
      maxTemp: '约 60°C',
    },
    usageInstructions: [
      '储存纯水或指定溶剂',
      '使用时挤压瓶身',
      '保持喷嘴清洁',
      '定期更换',
    ],
    safetyWarnings: [
      '避免使用不兼容的溶剂',
      '有机溶剂洗瓶需标注内容物',
    ],
  },
  '软木瓶托': {
    id: 'cork-ring',
    name: '软木瓶托',
    image: getImagePath('25_软木瓶托.png'),
    shortUse: '支撑圆底瓶、隔热',
    description: '软木瓶托是圆底烧瓶的专用支架，采用软木或耐热塑料制成，可支撑瓶底并提供隔热保护。',
    materialProperties: {
      material: '软木或耐热塑料',
      thermalResistance: '良好',
      chemicalResistance: '一般',
      maxTemp: '约 150°C',
    },
    usageInstructions: [
      '选择与瓶底尺寸匹配的瓶托',
      '放置于稳固平面',
      '加热时使用',
      '保持清洁',
    ],
    safetyWarnings: [
      '软木易燃，远离火源',
      '塑料瓶托注意最高温度限制',
    ],
  },
  '烧瓶架': {
    id: 'flask-holder',
    name: '烧瓶架',
    image: getImagePath('26_试管架.png'),
    shortUse: '放置烧瓶、晾干',
    description: '烧瓶架用于放置不同规格的圆底烧瓶、锥形瓶等。有塑料和金属材质，可配合孔径选择使用。',
    materialProperties: {
      material: '塑料或金属',
      thermalResistance: '一般',
      chemicalResistance: '良好',
      maxTemp: '根据材质',
    },
    usageInstructions: [
      '选择合适孔径',
      '平稳放置',
      '用于晾干时倒置',
      '保持清洁',
    ],
    safetyWarnings: [
      '放置稳固防止倾倒',
      '重瓶小心轻放',
    ],
  },
  '铁架台': {
    id: 'iron-stand',
    name: '铁架台',
    image: getImagePath('27_铁架台.png'),
    shortUse: '固定反应容器、支撑仪器',
    description: '铁架台是实验室的基础支撑设备，用于固定反应瓶、冷凝管、漏斗等仪器。底座沉重确保稳定。',
    materialProperties: {
      material: '铸铁底座+铁杆',
      thermalResistance: '良好',
      chemicalResistance: '避免强酸腐蚀',
      maxTemp: '耐高温',
    },
    usageInstructions: [
      '调节合适高度',
      '用夹子固定容器',
      '底座朝下放置稳固',
      '防止生锈',
    ],
    safetyWarnings: [
      '确保安装稳固',
      '重容器使用大底座',
      '防止铁架倾倒',
    ],
  },
  '铁圈': {
    id: 'iron-ring',
    name: '铁圈',
    image: getImagePath('28_铁圈.png'),
    shortUse: '支撑漏斗、放置容器',
    description: '铁圈安装在铁架台上，用于支撑漏斗、放置容器或作为加热时的支撑架。',
    materialProperties: {
      material: '铁',
      thermalResistance: '良好',
      chemicalResistance: '避免强酸腐蚀',
      maxTemp: '耐高温',
    },
    usageInstructions: [
      '调节到合适高度',
      '选择合适直径的铁圈',
      '可配合石棉网使用',
      '防止生锈',
    ],
    safetyWarnings: [
      '确保固定牢固',
      '热铁圈避免直接接触塑料',
    ],
  },
};
