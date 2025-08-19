// ✅ ХОРОШО: Соблюдение DIP - функции зависят от абстракций, а не от конкретных реализаций
//
// 🔄 ОСНОВНАЯ ИДЕЯ DIP:
// 1. ВЫСОКОУРОВНЕВЫЕ МОДУЛИ НЕ ДОЛЖНЫ ЗАВИСЕТЬ ОТ НИЗКОУРОВНЕВЫХ
//    - calculateShape, processShapes (высокоуровневые) НЕ зависят от createCircle, createRectangle (низкоуровневые)
//    - Вместо этого они зависят от типа Shape (абстракция)
//
// 2. ОБА ТИПА ДОЛЖНЫ ЗАВИСЕТЬ ОТ АБСТРАКЦИЙ
//    - Высокоуровневые функции: calculateShape зависит от Shape, Storage, Display
//    - Низкоуровневые функции: createCircle, createRectangle возвращают Shape
//
// 3. АБСТРАКЦИИ НЕ ДОЛЖНЫ ЗАВИСЕТЬ ОТ ДЕТАЛЕЙ
//    - Тип Shape НЕ знает о конкретных реализациях createCircle, createRectangle
//    - Тип Storage НЕ знает о createFileStorage, createDatabaseStorage
//
// 4. ДЕТАЛИ ДОЛЖНЫ ЗАВИСЕТЬ ОТ АБСТРАКЦИЙ
//    - createCircle, createRectangle возвращают объекты типа Shape
//    - createFileStorage, createDatabaseStorage возвращают объекты типа Storage
//
// ПРЕИМУЩЕСТВА:
// 1. Слабая связанность - функции зависят от абстракций
// 2. Соблюдение принципа инверсии зависимостей - зависимости направлены к абстракциям
// 3. Легкость тестирования - можно легко заменить зависимости
// 4. Соблюдение принципа открытости/закрытости - изменения в зависимостях не влияют на функции
// 5. Простота расширения - добавление новых типов не требует изменения существующих функций

// ✅ DIP: Абстракции (типы) - высокоуровневые функции зависят от них
// 🔄 ПРИНЦИП: Абстракции не должны зависеть от деталей

// Абстракция для фигур
type Shape = {
    getArea: () => number;
    getPerimeter: () => number;
    getInfo: () => string;
};

// Абстракция для сохранения данных
type Storage = {
    save: (data: string) => void;
};

// Абстракция для отображения данных
type Display = {
    show: (data: string) => void;
};

// Абстракция для валидации фигур
type ShapeValidator = {
    validate: (shape: Shape) => boolean;
};

// Абстракция для создания фигур
type ShapeFactory = {
    createShape: (params: any) => Shape;
};

// ✅ DIP: Конкретные реализации - низкоуровневые функции создают объекты
// 🔄 ПРИНЦИП: Детали должны зависеть от абстракций

// Конкретные реализации фигур
function createCircle(radius: number): Shape {
    return {
        getArea: () => Math.PI * radius * radius,
        getPerimeter: () => 2 * Math.PI * radius,
        getInfo: () => `Circle: radius=${radius}`
    };
}

function createRectangle(width: number, height: number): Shape {
    return {
        getArea: () => width * height,
        getPerimeter: () => 2 * (width + height),
        getInfo: () => `Rectangle: ${width}x${height}`
    };
}

function createTriangle(side1: number, side2: number, side3: number): Shape {
    const perimeter = side1 + side2 + side3;
    const s = perimeter / 2;
    const area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
    
    return {
        getArea: () => area,
        getPerimeter: () => perimeter,
        getInfo: () => `Triangle: sides=${side1},${side2},${side3}`
    };
}

// Конкретные реализации хранилищ
function createFileStorage(): Storage {
    return {
        save: (data: string) => console.log(`Saving to file: ${data}`)
    };
}

function createDatabaseStorage(): Storage {
    return {
        save: (data: string) => console.log(`Saving to database: ${data}`)
    };
}

function createCloudStorage(): Storage {
    return {
        save: (data: string) => console.log(`Saving to cloud: ${data}`)
    };
}

// Конкретные реализации отображения
function createConsoleDisplay(): Display {
    return {
        show: (data: string) => console.log(`Console: ${data}`)
    };
}

function createHTMLDisplay(): Display {
    return {
        show: (data: string) => console.log(`HTML: ${data}`)
    };
}

function createPDFDisplay(): Display {
    return {
        show: (data: string) => console.log(`PDF: ${data}`)
    };
}

// Конкретные реализации валидаторов
function createBasicValidator(): ShapeValidator {
    return {
        validate: (shape: Shape) => shape.getArea() > 0 && shape.getPerimeter() > 0
    };
}

function createAdvancedValidator(): ShapeValidator {
    return {
        validate: (shape: Shape) => {
            const basicValid = shape.getArea() > 0 && shape.getPerimeter() > 0;
            const areaValid = shape.getArea() <= 10000; // Максимальная площадь
            const perimeterValid = shape.getPerimeter() <= 1000; // Максимальный периметр
            return basicValid && areaValid && perimeterValid;
        }
    };
}

// Конкретные реализации фабрик
function createCircleFactory(): ShapeFactory {
    return {
        createShape: (params: { radius: number }) => createCircle(params.radius)
    };
}

function createRectangleFactory(): ShapeFactory {
    return {
        createShape: (params: { width: number; height: number }) => createRectangle(params.width, params.height)
    };
}

function createTriangleFactory(): ShapeFactory {
    return {
        createShape: (params: { side1: number; side2: number; side3: number }) => 
            createTriangle(params.side1, params.side2, params.side3)
    };
}

// ✅ DIP: Высокоуровневые функции зависят от абстракций
// 🔄 ПРИНЦИП: Высокоуровневые модули не должны зависеть от низкоуровневых

// Функция для расчета фигур - зависит от абстракций
// 🔄 ПРИНЦИП: Оба типа должны зависеть от абстракций
function calculateShape(
    shape: Shape,      // ✅ Абстракция, а не конкретный тип Circle
    storage: Storage,  // ✅ Абстракция, а не конкретный тип FileStorage
    display: Display,  // ✅ Абстракция, а не конкретный тип ConsoleDisplay
    validator: ShapeValidator // ✅ Абстракция, а не конкретный тип BasicValidator
): void {
    // ✅ Работаем с абстракциями, а не с конкретными типами
    if (!validator.validate(shape)) {
        throw new Error('Invalid shape');
    }

    const area = shape.getArea();      // ✅ Абстракция Shape
    const perimeter = shape.getPerimeter(); // ✅ Абстракция Shape
    const info = shape.getInfo();      // ✅ Абстракция Shape

    const result = `${info} - Area: ${area.toFixed(2)}, Perimeter: ${perimeter.toFixed(2)}`;

    storage.save(result);  // ✅ Используем абстракцию Storage
    display.show(result);  // ✅ Используем абстракцию Display
}

// Функция для обработки массива фигур - зависит от абстракций
function processShapes(
    shapes: Shape[],
    storage: Storage,
    display: Display,
    validator: ShapeValidator
): void {
    console.log('Processing shapes...');
    shapes.forEach((shape, index) => {
        console.log(`\n--- Shape ${index + 1} ---`);
        calculateShape(shape, storage, display, validator);
    });
}

// Функция для сравнения фигур - зависит от абстракций
function compareShapes(
    shapes: Shape[],
    storage: Storage,
    display: Display
): void {
    console.log('Comparing shapes...');
    
    shapes.forEach((shape, index) => {
        const info = `${index + 1}. ${shape.getInfo()} - Area: ${shape.getArea().toFixed(2)}`;
        storage.save(info);
        display.show(info);
    });

    // Находим фигуру с максимальной площадью
    const largestShape = shapes.reduce((largest, current) => {
        return current.getArea() > largest.getArea() ? current : largest;
    });

    const largestInfo = `Largest shape: ${largestShape.getInfo()} - Area: ${largestShape.getArea().toFixed(2)}`;
    storage.save(largestInfo);
    display.show(largestInfo);
}

// Функция для генерации отчетов - зависит от абстракций
function generateReport(
    shapeParams: any[],
    shapeFactory: ShapeFactory,
    storage: Storage,
    display: Display
): void {
    console.log('Generating report...');
    
    const shapes: Shape[] = shapeParams.map(params => shapeFactory.createShape(params));
    
    const report = `
        Shape Report:
        ${shapes.map((shape, index) => 
            `${index + 1}. ${shape.getInfo()}: Area = ${shape.getArea().toFixed(2)}, Perimeter = ${shape.getPerimeter().toFixed(2)}`
        ).join('\n        ')}
        
        Total shapes: ${shapes.length}
        Total area: ${shapes.reduce((sum, shape) => sum + shape.getArea(), 0).toFixed(2)}
    `;

    storage.save(report);
    display.show(report);
}

// Функция для валидации фигур - зависит от абстракций
function validateShapes(
    shapes: Shape[],
    validator: ShapeValidator
): void {
    console.log('Validating shapes...');
    
    shapes.forEach((shape, index) => {
        const isValid = validator.validate(shape);
        console.log(`Shape ${index + 1} (${shape.getInfo()}): ${isValid ? 'PASS' : 'FAIL'}`);
    });
}

// Функция для фильтрации фигур - зависит от абстракций
function filterShapesByArea(
    shapes: Shape[],
    minArea: number
): Shape[] {
    return shapes.filter(shape => shape.getArea() >= minArea);
}

// Функция для сортировки фигур - зависит от абстракций
function sortShapesByPerimeter(
    shapes: Shape[]
): Shape[] {
    return [...shapes].sort((a, b) => a.getPerimeter() - b.getPerimeter());
}

// Функция для поиска фигуры с максимальной площадью - зависит от абстракций
function findLargestShape(
    shapes: Shape[]
): Shape | null {
    if (shapes.length === 0) return null;
    
    return shapes.reduce((largest, current) => {
        return current.getArea() > largest.getArea() ? current : largest;
    });
}

// ✅ DIP: Функция для управления фигурами - зависит от абстракций
function manageShapeCollection(
    shapes: Shape[],
    storage: Storage,
    display: Display,
    validator: ShapeValidator
): void {
    console.log('=== Managing shape collection ===');
    
    // Валидация
    validateShapes(shapes, validator);
    
    // Обработка
    processShapes(shapes, storage, display, validator);
    
    // Сравнение
    compareShapes(shapes, storage, display);
    
    // Фильтрация
    const largeShapes = filterShapesByArea(shapes, 20);
    console.log(`\nShapes with area >= 20: ${largeShapes.length}`);
    largeShapes.forEach(shape => console.log(shape.getInfo()));
    
    // Сортировка
    const sortedShapes = sortShapesByPerimeter(shapes);
    console.log('\nShapes sorted by perimeter:');
    sortedShapes.forEach(shape => console.log(`${shape.getInfo()} - Perimeter: ${shape.getPerimeter().toFixed(2)}`));
    
    // Поиск максимальной фигуры
    const largest = findLargestShape(shapes);
    if (largest) {
        console.log(`\nLargest shape: ${largest.getInfo()} - Area: ${largest.getArea().toFixed(2)}`);
    }
}

// Использование - демонстрация правильного применения DIP

// Создание зависимостей (в реальном приложении это делается через DI контейнер)
const fileStorage = createFileStorage();
const databaseStorage = createDatabaseStorage();
const cloudStorage = createCloudStorage();

const consoleDisplay = createConsoleDisplay();
const htmlDisplay = createHTMLDisplay();
const pdfDisplay = createPDFDisplay();

const basicValidator = createBasicValidator();
const advancedValidator = createAdvancedValidator();

const circleFactory = createCircleFactory();
const rectangleFactory = createRectangleFactory();
const triangleFactory = createTriangleFactory();

// Создание фигур через фабрики
const circle = circleFactory.createShape({ radius: 5 });
const rectangle = rectangleFactory.createShape({ width: 4, height: 6 });
const triangle = triangleFactory.createShape({ side1: 3, side2: 4, side3: 5 });

const shapes = [circle, rectangle, triangle];

console.log('=== Individual shape processing:');
calculateShape(circle, fileStorage, consoleDisplay, basicValidator);
calculateShape(rectangle, databaseStorage, htmlDisplay, basicValidator);
calculateShape(triangle, cloudStorage, pdfDisplay, advancedValidator);

console.log('\n=== Shape processing with different validators:');
processShapes(shapes, fileStorage, consoleDisplay, basicValidator);

console.log('\n=== Shape comparison:');
compareShapes(shapes, databaseStorage, htmlDisplay);

console.log('\n=== Report generation:');
generateReport(
    [
        { radius: 5 },
        { width: 4, height: 6 },
        { side1: 3, side2: 4, side3: 5 }
    ],
    circleFactory,
    cloudStorage,
    pdfDisplay
);

console.log('\n=== Shape validation:');
validateShapes(shapes, advancedValidator);

console.log('\n=== Shape collection management:');
manageShapeCollection(shapes, fileStorage, consoleDisplay, basicValidator); 