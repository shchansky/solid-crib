// ❌ ПЛОХО: Нарушение ISP - функции работают с толстыми типами, содержащими ненужные методы
//
// ПРОБЛЕМЫ:
// 1. Толстые типы - содержат слишком много методов
// 2. Принудительная зависимость - функции зависят от ненужных методов
// 3. Нарушение принципа единственной ответственности - функции знают о слишком многом
// 4. Сложность тестирования - нужно создавать объекты со всеми методами
// 5. Нарушение принципа подстановки - функции могут случайно вызвать ненужные методы

// ❌ НАРУШЕНИЕ ISP: Толстый тип для фигуры, который содержит все возможные методы
type BadShapeData = {
    // Основные свойства
    type: string;
    area: number;
    perimeter: number;
    
    // Методы для всех фигур
    getArea: () => number;
    getPerimeter: () => number;
    getInfo: () => string;
    
    // Методы для рисования (не нужны для всех фигур)
    draw: () => void;
    draw3D: () => void;
    animate: () => void;
    
    // Методы для сохранения (не нужны для всех фигур)
    saveToFile: () => void;
    saveToDatabase: () => void;
    exportToPDF: () => void;
    
    // Методы для валидации (не нужны для всех фигур)
    validate: () => boolean;
    validateDimensions: () => boolean;
    validateColor: () => boolean;
    
    // Методы для трансформации (не нужны для всех фигур)
    rotate: (angle: number) => void;
    scale: (factor: number) => void;
    translate: (x: number, y: number) => void;
};

// ❌ НАРУШЕНИЕ ISP: Фабричные функции создают объекты с ненужными методами
function badCreateCircle(radius: number): BadShapeData {
    return {
        type: 'Circle',
        area: Math.PI * radius * radius,
        perimeter: 2 * Math.PI * radius,
        
        getArea: () => Math.PI * radius * radius,
        getPerimeter: () => 2 * Math.PI * radius,
        getInfo: () => `Circle: radius=${radius}`,
        
        // ❌ ПРОБЛЕМА: Круг должен реализовывать методы, которые ему не нужны
        draw: () => console.log('Drawing circle...'), // Пустая реализация
        draw3D: () => console.log('Drawing 3D circle...'), // Пустая реализация
        animate: () => console.log('Animating circle...'), // Пустая реализация
        
        saveToFile: () => console.log('Saving circle to file...'), // Пустая реализация
        saveToDatabase: () => console.log('Saving circle to database...'), // Пустая реализация
        exportToPDF: () => console.log('Exporting circle to PDF...'), // Пустая реализация
        
        validate: () => radius > 0, // Только этот метод имеет смысл
        validateDimensions: () => true, // Пустая реализация
        validateColor: () => true, // Пустая реализация
        
        rotate: (angle: number) => console.log(`Rotating circle by ${angle} degrees...`), // Пустая реализация
        scale: (factor: number) => console.log(`Scaling circle by factor ${factor}`), // Пустая реализация
        translate: (x: number, y: number) => console.log(`Translating circle to (${x}, ${y})...`) // Пустая реализация
    };
}

function badCreateRectangle(width: number, height: number): BadShapeData {
    return {
        type: 'Rectangle',
        area: width * height,
        perimeter: 2 * (width + height),
        
        getArea: () => width * height,
        getPerimeter: () => 2 * (width + height),
        getInfo: () => `Rectangle: ${width}x${height}`,
        
        // ❌ ПРОБЛЕМА: Прямоугольник должен реализовывать методы, которые ему не нужны
        draw: () => console.log('Drawing rectangle...'), // Пустая реализация
        draw3D: () => console.log('Drawing 3D rectangle...'), // Пустая реализация
        animate: () => console.log('Animating rectangle...'), // Пустая реализация
        
        saveToFile: () => console.log('Saving rectangle to file...'), // Пустая реализация
        saveToDatabase: () => console.log('Saving rectangle to database...'), // Пустая реализация
        exportToPDF: () => console.log('Exporting rectangle to PDF...'), // Пустая реализация
        
        validate: () => width > 0 && height > 0, // Только этот метод имеет смысл
        validateDimensions: () => true, // Пустая реализация
        validateColor: () => true, // Пустая реализация
        
        rotate: (angle: number) => console.log(`Rotating rectangle by ${angle} degrees...`), // Пустая реализация
        scale: (factor: number) => console.log(`Scaling rectangle by factor ${factor}`), // Пустая реализация
        translate: (x: number, y: number) => console.log(`Translating rectangle to (${x}, ${y})...`) // Пустая реализация
    };
}

function badCreateTriangle(side1: number, side2: number, side3: number): BadShapeData {
    const perimeter = side1 + side2 + side3;
    const s = perimeter / 2;
    const area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
    
    return {
        type: 'Triangle',
        area: area,
        perimeter: perimeter,
        
        getArea: () => area,
        getPerimeter: () => perimeter,
        getInfo: () => `Triangle: sides=${side1},${side2},${side3}`,
        
        // ❌ ПРОБЛЕМА: Треугольник должен реализовывать методы, которые ему не нужны
        draw: () => console.log('Drawing triangle...'), // Пустая реализация
        draw3D: () => console.log('Drawing 3D triangle...'), // Пустая реализация
        animate: () => console.log('Animating triangle...'), // Пустая реализация
        
        saveToFile: () => console.log('Saving triangle to file...'), // Пустая реализация
        saveToDatabase: () => console.log('Saving triangle to database...'), // Пустая реализация
        exportToPDF: () => console.log('Exporting triangle to PDF...'), // Пустая реализация
        
        validate: () => side1 > 0 && side2 > 0 && side3 > 0, // Только этот метод имеет смысл
        validateDimensions: () => true, // Пустая реализация
        validateColor: () => true, // Пустая реализация
        
        rotate: (angle: number) => console.log(`Rotating triangle by ${angle} degrees...`), // Пустая реализация
        scale: (factor: number) => console.log(`Scaling triangle by factor ${factor}`), // Пустая реализация
        translate: (x: number, y: number) => console.log(`Translating triangle to (${x}, ${y})...`) // Пустая реализация
    };
}

// ❌ НАРУШЕНИЕ ISP: Функции работают с толстыми типами и могут случайно вызвать ненужные методы

// Функция для расчета свойств - должна работать только с базовыми методами
function badCalculateShapeProperties(shape: BadShapeData): void {
    console.log('Calculating shape properties...');
    console.log('Info:', shape.getInfo());
    console.log('Area:', shape.getArea().toFixed(2));
    console.log('Perimeter:', shape.getPerimeter().toFixed(2));
    
    // ❌ ПРОБЛЕМА: Функция может случайно вызвать ненужные методы
    // shape.draw(); // Это может сломать логику!
    // shape.saveToDatabase(); // Это может сломать логику!
    // shape.rotate(45); // Это может сломать логику!
}

// Функция для рисования - должна работать только с методами рисования
function badDrawShape(shape: BadShapeData): void {
    console.log('Drawing shape...');
    shape.draw();
    shape.draw3D();
    shape.animate();
    
    // ❌ ПРОБЛЕМА: Функция может случайно вызвать ненужные методы
    // shape.saveToDatabase(); // Это может сломать логику!
    // shape.validate(); // Это может сломать логику!
}

// Функция для сохранения - должна работать только с методами сохранения
function badSaveShape(shape: BadShapeData): void {
    console.log('Saving shape...');
    shape.saveToFile();
    shape.saveToDatabase();
    shape.exportToPDF();
    
    // ❌ ПРОБЛЕМА: Функция может случайно вызвать ненужные методы
    // shape.draw(); // Это может сломать логику!
    // shape.validate(); // Это может сломать логику!
}

// Функция для валидации - должна работать только с методами валидации
function badValidateShape(shape: BadShapeData): void {
    console.log('Validating shape...');
    console.log('Basic validation:', shape.validate());
    console.log('Dimensions validation:', shape.validateDimensions());
    console.log('Color validation:', shape.validateColor());
    
    // ❌ ПРОБЛЕМА: Функция может случайно вызвать ненужные методы
    // shape.draw(); // Это может сломать логику!
    // shape.saveToDatabase(); // Это может сломать логику!
}

// Функция для трансформации - должна работать только с методами трансформации
function badTransformShape(shape: BadShapeData): void {
    console.log('Transforming shape...');
    shape.rotate(45);
    shape.scale(2);
    shape.translate(10, 20);
    
    // ❌ ПРОБЛЕМА: Функция может случайно вызвать ненужные методы
    // shape.draw(); // Это может сломать логику!
    // shape.saveToDatabase(); // Это может сломать логику!
}

// ❌ НАРУШЕНИЕ ISP: Функция для обработки всех фигур - слишком много зависимостей
function badProcessAllShapes(shapes: BadShapeData[]): void {
    console.log('Processing all shapes...');
    
    shapes.forEach((shape, index) => {
        console.log(`\n--- Shape ${index + 1} ---`);
        
        // ❌ ПРОБЛЕМА: Функция вызывает все методы, даже если они не нужны
        badCalculateShapeProperties(shape);
        badDrawShape(shape);
        badSaveShape(shape);
        badValidateShape(shape);
        badTransformShape(shape);
    });
}

// ❌ НАРУШЕНИЕ ISP: Функция для фильтрации фигур - зависит от толстого типа
function badFilterShapesByArea(shapes: BadShapeData[], minArea: number): BadShapeData[] {
    return shapes.filter(shape => shape.getArea() >= minArea);
}

// ❌ НАРУШЕНИЕ ISP: Функция для сортировки фигур - зависит от толстого типа
function badSortShapesByPerimeter(shapes: BadShapeData[]): BadShapeData[] {
    return [...shapes].sort((a, b) => a.getPerimeter() - b.getPerimeter());
}

// Использование - демонстрация проблем
const badCircle = badCreateCircle(5);
const badRectangle = badCreateRectangle(4, 6);
const badTriangle = badCreateTriangle(3, 4, 5);

console.log('=== BadCircle:');
badCalculateShapeProperties(badCircle);
badDrawShape(badCircle);
badSaveShape(badCircle);
badValidateShape(badCircle);
badTransformShape(badCircle);

console.log('\n=== BadRectangle:');
badCalculateShapeProperties(badRectangle);
badDrawShape(badRectangle);
badSaveShape(badRectangle);
badValidateShape(badRectangle);
badTransformShape(badRectangle);

console.log('\n=== BadTriangle:');
badCalculateShapeProperties(badTriangle);
badDrawShape(badTriangle);
badSaveShape(badTriangle);
badValidateShape(badTriangle);
badTransformShape(badTriangle);

console.log('\n=== Processing all shapes:');
badProcessAllShapes([badCircle, badRectangle, badTriangle]); 