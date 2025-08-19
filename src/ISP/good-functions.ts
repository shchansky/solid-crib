// ✅ ХОРОШО: Соблюдение ISP - тонкие типы, которые содержат только нужные методы
//
// ПРЕИМУЩЕСТВА:
// 1. Тонкие типы - содержат только необходимые методы
// 2. Добровольная зависимость - функции зависят только от нужных методов
// 3. Соблюдение принципа единственной ответственности - функции знают только о своей области
// 4. Легкость тестирования - можно создавать объекты только с нужными методами
// 5. Гибкость - функции работают с любыми объектами, имеющими нужные методы

// ✅ ISP: Тонкие типы для разных областей ответственности

// Базовый тип для всех фигур - только основные методы
type ShapeData = {
    getArea: () => number;
    getPerimeter: () => number;
    getInfo: () => string;
};

// Тип для рисования - только методы рисования
type DrawableData = {
    draw: () => void;
    draw3D: () => void;
    animate: () => void;
};

// Тип для сохранения - только методы сохранения
type SaveableData = {
    saveToFile: () => void;
    saveToDatabase: () => void;
    exportToPDF: () => void;
};

// Тип для валидации - только методы валидации
type ValidatableData = {
    validate: () => boolean;
    validateDimensions: () => boolean;
    validateColor: () => boolean;
};

// Тип для трансформации - только методы трансформации
type TransformableData = {
    rotate: (angle: number) => void;
    scale: (factor: number) => void;
    translate: (x: number, y: number) => void;
};

// ✅ ISP: Фабричные функции создают объекты только с нужными методами

function createCircle(radius: number): ShapeData & ValidatableData & TransformableData {
    return {
        getArea: () => Math.PI * radius * radius,
        getPerimeter: () => 2 * Math.PI * radius,
        getInfo: () => `Circle: radius=${radius}`,
        
        validate: () => radius > 0,
        validateDimensions: () => radius <= 1000,
        validateColor: () => true,
        
        rotate: (angle: number) => console.log(`Rotating circle by ${angle} degrees...`),
        scale: (factor: number) => console.log(`Scaling circle by factor ${factor}`),
        translate: (x: number, y: number) => console.log(`Translating circle to (${x}, ${y})...`)
    };
}

function createRectangle(width: number, height: number): ShapeData & DrawableData & ValidatableData & TransformableData {
    return {
        getArea: () => width * height,
        getPerimeter: () => 2 * (width + height),
        getInfo: () => `Rectangle: ${width}x${height}`,
        
        draw: () => console.log(`Drawing rectangle with dimensions ${width}x${height}`),
        draw3D: () => console.log(`Drawing 3D rectangle with dimensions ${width}x${height}`),
        animate: () => console.log(`Animating rectangle with dimensions ${width}x${height}`),
        
        validate: () => width > 0 && height > 0,
        validateDimensions: () => width <= 1000 && height <= 1000,
        validateColor: () => true,
        
        rotate: (angle: number) => console.log(`Rotating rectangle by ${angle} degrees...`),
        scale: (factor: number) => console.log(`Scaling rectangle by factor ${factor}`),
        translate: (x: number, y: number) => console.log(`Translating rectangle to (${x}, ${y})...`)
    };
}

function createTriangle(side1: number, side2: number, side3: number): ShapeData & SaveableData & ValidatableData & TransformableData {
    const perimeter = side1 + side2 + side3;
    const s = perimeter / 2;
    const area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
    
    return {
        getArea: () => area,
        getPerimeter: () => perimeter,
        getInfo: () => `Triangle: sides=${side1},${side2},${side3}`,
        
        saveToFile: () => console.log(`Saving triangle data to file: sides=${side1},${side2},${side3}`),
        saveToDatabase: () => console.log(`Saving triangle data to database: sides=${side1},${side2},${side3}`),
        exportToPDF: () => console.log(`Exporting triangle data to PDF: sides=${side1},${side2},${side3}`),
        
        validate: () => side1 > 0 && side2 > 0 && side3 > 0,
        validateDimensions: () => {
            return side1 + side2 > side3 && side2 + side3 > side1 && side1 + side3 > side2;
        },
        validateColor: () => true,
        
        rotate: (angle: number) => console.log(`Rotating triangle by ${angle} degrees...`),
        scale: (factor: number) => console.log(`Scaling triangle by factor ${factor}`),
        translate: (x: number, y: number) => console.log(`Translating triangle to (${x}, ${y})...`)
    };
}

// ✅ ISP: Функции работают только с нужными типами

// Функция для расчета свойств - работает только с ShapeData
function calculateShapeProperties(shape: ShapeData): void {
    console.log('Calculating shape properties...');
    console.log('Info:', shape.getInfo());
    console.log('Area:', shape.getArea().toFixed(2));
    console.log('Perimeter:', shape.getPerimeter().toFixed(2));
}

// Функция для рисования - работает только с DrawableData
function drawShape(drawable: DrawableData): void {
    console.log('Drawing shape...');
    drawable.draw();
    drawable.draw3D();
    drawable.animate();
}

// Функция для сохранения - работает только с SaveableData
function saveShape(saveable: SaveableData): void {
    console.log('Saving shape...');
    saveable.saveToFile();
    saveable.saveToDatabase();
    saveable.exportToPDF();
}

// Функция для валидации - работает только с ValidatableData
function validateShape(validatable: ValidatableData): void {
    console.log('Validating shape...');
    console.log('Basic validation:', validatable.validate());
    console.log('Dimensions validation:', validatable.validateDimensions());
    console.log('Color validation:', validatable.validateColor());
}

// Функция для трансформации - работает только с TransformableData
function transformShape(transformable: TransformableData): void {
    console.log('Transforming shape...');
    transformable.rotate(45);
    transformable.scale(2);
    transformable.translate(10, 20);
}

// ✅ ISP: Функции для работы с коллекциями - используют только нужные типы

// Функция для обработки всех фигур - работает только с базовыми свойствами
function processShapes(shapes: ShapeData[]): void {
    console.log('Processing shapes...');
    shapes.forEach((shape, index) => {
        console.log(`\n--- Shape ${index + 1} ---`);
        calculateShapeProperties(shape);
    });
}

// Функция для рисования всех фигур - работает только с рисованием
function drawShapes(drawables: DrawableData[]): void {
    console.log('Drawing shapes...');
    drawables.forEach((drawable, index) => {
        console.log(`\n--- Drawing Shape ${index + 1} ---`);
        drawShape(drawable);
    });
}

// Функция для сохранения всех фигур - работает только с сохранением
function saveShapes(saveables: SaveableData[]): void {
    console.log('Saving shapes...');
    saveables.forEach((saveable, index) => {
        console.log(`\n--- Saving Shape ${index + 1} ---`);
        saveShape(saveable);
    });
}

// Функция для валидации всех фигур - работает только с валидацией
function validateShapes(validatables: ValidatableData[]): void {
    console.log('Validating shapes...');
    validatables.forEach((validatable, index) => {
        console.log(`\n--- Validating Shape ${index + 1} ---`);
        validateShape(validatable);
    });
}

// Функция для трансформации всех фигур - работает только с трансформацией
function transformShapes(transformables: TransformableData[]): void {
    console.log('Transforming shapes...');
    transformables.forEach((transformable, index) => {
        console.log(`\n--- Transforming Shape ${index + 1} ---`);
        transformShape(transformable);
    });
}

// ✅ ISP: Функции для фильтрации и сортировки - используют только нужные типы

// Функция для фильтрации фигур по площади - работает только с ShapeData
function filterShapesByArea(shapes: ShapeData[], minArea: number): ShapeData[] {
    return shapes.filter(shape => shape.getArea() >= minArea);
}

// Функция для сортировки фигур по периметру - работает только с ShapeData
function sortShapesByPerimeter(shapes: ShapeData[]): ShapeData[] {
    return [...shapes].sort((a, b) => a.getPerimeter() - b.getPerimeter());
}

// Функция для поиска фигуры с максимальной площадью - работает только с ShapeData
function findLargestShape(shapes: ShapeData[]): ShapeData | null {
    if (shapes.length === 0) return null;
    
    return shapes.reduce((largest, current) => {
        return current.getArea() > largest.getArea() ? current : largest;
    });
}

// Использование - демонстрация правильного применения ISP
const circle = createCircle(5);
const rectangle = createRectangle(4, 6);
const triangle = createTriangle(3, 4, 5);

console.log('=== Circle (Shape + Validatable + Transformable):');
calculateShapeProperties(circle);
validateShape(circle);
transformShape(circle);

console.log('\n=== Rectangle (Shape + Drawable + Validatable + Transformable):');
calculateShapeProperties(rectangle);
drawShape(rectangle);
validateShape(rectangle);
transformShape(rectangle);

console.log('\n=== Triangle (Shape + Saveable + Validatable + Transformable):');
calculateShapeProperties(triangle);
saveShape(triangle);
validateShape(triangle);
transformShape(triangle);

console.log('\n=== Processing all shapes:');
processShapes([circle, rectangle, triangle]);

console.log('\n=== Drawing drawable shapes:');
drawShapes([rectangle]); // Только прямоугольник поддерживает рисование

console.log('\n=== Saving saveable shapes:');
saveShapes([triangle]); // Только треугольник поддерживает сохранение

console.log('\n=== Validating all shapes:');
validateShapes([circle, rectangle, triangle]);

console.log('\n=== Transforming all shapes:');
transformShapes([circle, rectangle, triangle]);

console.log('\n=== Filtering shapes by area (min 20):');
const largeShapes = filterShapesByArea([circle, rectangle, triangle], 20);
largeShapes.forEach(shape => console.log(shape.getInfo()));

console.log('\n=== Sorting shapes by perimeter:');
const sortedShapes = sortShapesByPerimeter([circle, rectangle, triangle]);
sortedShapes.forEach(shape => console.log(`${shape.getInfo()} - Perimeter: ${shape.getPerimeter().toFixed(2)}`));

console.log('\n=== Finding largest shape:');
const largest = findLargestShape([circle, rectangle, triangle]);
if (largest) {
    console.log('Largest shape:', largest.getInfo());
    console.log('Area:', largest.getArea().toFixed(2));
} 