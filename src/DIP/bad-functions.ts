// ❌ ПЛОХО: Нарушение DIP - функции зависят от конкретных реализаций, а не от абстракций
//
// 🔄 НАРУШЕНИЕ ОСНОВНОЙ ИДЕИ DIP:
// 1. ❌ ВЫСОКОУРОВНЕВЫЕ МОДУЛИ ЗАВИСЯТ ОТ НИЗКОУРОВНЕВЫХ
//    - badCalculateCircleArea (высокоуровневая) зависит от Circle (низкоуровневый)
//    - badProcessAllShapes (высокоуровневая) создает конкретные объекты: badCreateCircle(), badCreateRectangle()
//
// 2. ❌ НЕ ОБА ТИПА ЗАВИСЯТ ОТ АБСТРАКЦИЙ
//    - Высокоуровневые функции: badCalculateCircleArea зависит от Circle, FileStorage (конкретные)
//    - Низкоуровневые функции: badCreateCircle, badCreateRectangle НЕ возвращают общий тип
//
// 3. ❌ АБСТРАКЦИИ ЗАВИСЯТ ОТ ДЕТАЛЕЙ (их просто нет!)
//    - Нет типов Shape, Storage, Display
//    - Все зависимости направлены к конкретным типам
//
// 4. ❌ ДЕТАЛИ НЕ ЗАВИСЯТ ОТ АБСТРАКЦИЙ
//    - badCreateCircle, badCreateRectangle НЕ возвращают общий тип
//    - badCreateFileStorage, badCreateDatabaseStorage НЕ возвращают общий тип
//
// ПРОБЛЕМЫ:
// 1. Жесткая связанность - функции зависят от конкретных типов
// 2. Нарушение принципа инверсии зависимостей - зависимости направлены к конкретным реализациям
// 3. Сложность тестирования - нельзя легко заменить зависимости
// 4. Нарушение принципа открытости/закрытости - изменения в зависимостях влияют на функции
// 5. Сложность расширения - добавление новых типов требует изменения существующих функций

// ❌ НАРУШЕНИЕ DIP: Конкретные типы для фигур
// 🔄 ПРОБЛЕМА: Нет общего типа - детали не зависят от абстракций
type Circle = {
    type: 'circle';
    radius: number;
    getArea: () => number;
    getPerimeter: () => number;
    getInfo: () => string;
};

type Rectangle = {
    type: 'rectangle';
    width: number;
    height: number;
    getArea: () => number;
    getPerimeter: () => number;
    getInfo: () => string;
};

type Triangle = {
    type: 'triangle';
    side1: number;
    side2: number;
    side3: number;
    getArea: () => number;
    getPerimeter: () => number;
    getInfo: () => string;
};

// ❌ НАРУШЕНИЕ DIP: Конкретные типы для хранилищ
type FileStorage = {
    type: 'file';
    saveToFile: (data: string) => void;
};

type DatabaseStorage = {
    type: 'database';
    saveToDatabase: (data: string) => void;
};

type CloudStorage = {
    type: 'cloud';
    saveToCloud: (data: string) => void;
};

// ❌ НАРУШЕНИЕ DIP: Конкретные типы для отображения
type ConsoleDisplay = {
    type: 'console';
    display: (data: string) => void;
};

type HTMLDisplay = {
    type: 'html';
    display: (data: string) => void;
};

type PDFDisplay = {
    type: 'pdf';
    display: (data: string) => void;
};

// ❌ НАРУШЕНИЕ DIP: Фабричные функции создают конкретные объекты
// 🔄 ПРОБЛЕМА: Низкоуровневые функции НЕ зависят от абстракций
function badCreateCircle(radius: number): Circle {
    return {
        type: 'circle',
        radius,
        getArea: () => Math.PI * radius * radius,
        getPerimeter: () => 2 * Math.PI * radius,
        getInfo: () => `Circle: radius=${radius}`
    };
}

function badCreateRectangle(width: number, height: number): Rectangle {
    return {
        type: 'rectangle',
        width,
        height,
        getArea: () => width * height,
        getPerimeter: () => 2 * (width + height),
        getInfo: () => `Rectangle: ${width}x${height}`
    };
}

function badCreateTriangle(side1: number, side2: number, side3: number): Triangle {
    const perimeter = side1 + side2 + side3;
    const s = perimeter / 2;
    const area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
    
    return {
        type: 'triangle',
        side1,
        side2,
        side3,
        getArea: () => area,
        getPerimeter: () => perimeter,
        getInfo: () => `Triangle: sides=${side1},${side2},${side3}`
    };
}

// ❌ НАРУШЕНИЕ DIP: Функции создают конкретные хранилища
function badCreateFileStorage(): FileStorage {
    return {
        type: 'file',
        saveToFile: (data: string) => console.log(`Saving to file: ${data}`)
    };
}

function badCreateDatabaseStorage(): DatabaseStorage {
    return {
        type: 'database',
        saveToDatabase: (data: string) => console.log(`Saving to database: ${data}`)
    };
}

function badCreateCloudStorage(): CloudStorage {
    return {
        type: 'cloud',
        saveToCloud: (data: string) => console.log(`Saving to cloud: ${data}`)
    };
}

// ❌ НАРУШЕНИЕ DIP: Функции создают конкретные отображения
function badCreateConsoleDisplay(): ConsoleDisplay {
    return {
        type: 'console',
        display: (data: string) => console.log(`Console: ${data}`)
    };
}

function badCreateHTMLDisplay(): HTMLDisplay {
    return {
        type: 'html',
        display: (data: string) => console.log(`HTML: ${data}`)
    };
}

function badCreatePDFDisplay(): PDFDisplay {
    return {
        type: 'pdf',
        display: (data: string) => console.log(`PDF: ${data}`)
    };
}

// ❌ НАРУШЕНИЕ DIP: Функции зависят от конкретных типов
// 🔄 ПРОБЛЕМА: Высокоуровневые функции зависят от низкоуровневых

// Функция для расчета площади круга - зависит от конкретного типа Circle
// 🔄 НАРУШЕНИЕ: Высокоуровневый модуль зависит от низкоуровневого
function badCalculateCircleArea(circle: Circle): void {
    const area = circle.getArea();
    const perimeter = circle.getPerimeter();
    const info = circle.getInfo();
    
    // ❌ ПРОБЛЕМА: Функция создает конкретные зависимости внутри себя
    // 🔄 НАРУШЕНИЕ: Высокоуровневый модуль создает низкоуровневые модули
    const fileStorage = badCreateFileStorage();
    const databaseStorage = badCreateDatabaseStorage();
    const consoleDisplay = badCreateConsoleDisplay();
    
    const result = `${info} - Area: ${area.toFixed(2)}, Perimeter: ${perimeter.toFixed(2)}`;
    
    fileStorage.saveToFile(result);
    databaseStorage.saveToDatabase(result);
    consoleDisplay.display(result);
}

// Функция для расчета площади прямоугольника - зависит от конкретного типа Rectangle
function badCalculateRectangleArea(rectangle: Rectangle): void {
    const area = rectangle.getArea();
    const perimeter = rectangle.getPerimeter();
    const info = rectangle.getInfo();
    
    // ❌ ПРОБЛЕМА: Функция создает конкретные зависимости внутри себя
    const fileStorage = badCreateFileStorage();
    const databaseStorage = badCreateDatabaseStorage();
    const consoleDisplay = badCreateConsoleDisplay();
    
    const result = `${info} - Area: ${area.toFixed(2)}, Perimeter: ${perimeter.toFixed(2)}`;
    
    fileStorage.saveToFile(result);
    databaseStorage.saveToDatabase(result);
    consoleDisplay.display(result);
}

// Функция для расчета площади треугольника - зависит от конкретного типа Triangle
function badCalculateTriangleArea(triangle: Triangle): void {
    const area = triangle.getArea();
    const perimeter = triangle.getPerimeter();
    const info = triangle.getInfo();
    
    // ❌ ПРОБЛЕМА: Функция создает конкретные зависимости внутри себя
    const fileStorage = badCreateFileStorage();
    const databaseStorage = badCreateDatabaseStorage();
    const consoleDisplay = badCreateConsoleDisplay();
    
    const result = `${info} - Area: ${area.toFixed(2)}, Perimeter: ${perimeter.toFixed(2)}`;
    
    fileStorage.saveToFile(result);
    databaseStorage.saveToDatabase(result);
    consoleDisplay.display(result);
}

// ❌ НАРУШЕНИЕ DIP: Функция для обработки всех фигур зависит от конкретных типов
function badProcessAllShapes(): void {
    // ❌ ПРОБЛЕМА: Функция создает конкретные объекты внутри себя
    const circle = badCreateCircle(5);
    const rectangle = badCreateRectangle(4, 6);
    const triangle = badCreateTriangle(3, 4, 5);
    
    const fileStorage = badCreateFileStorage();
    const databaseStorage = badCreateDatabaseStorage();
    const consoleDisplay = badCreateConsoleDisplay();
    
    // ❌ ПРОБЛЕМА: Нужно знать конкретные типы для правильной обработки
    badCalculateCircleArea(circle);
    badCalculateRectangleArea(rectangle);
    badCalculateTriangleArea(triangle);
    
    // Дополнительная обработка
    fileStorage.saveToFile(circle.getInfo());
    fileStorage.saveToFile(rectangle.getInfo());
    fileStorage.saveToFile(triangle.getInfo());
    
    databaseStorage.saveToDatabase(circle.getInfo());
    databaseStorage.saveToDatabase(rectangle.getInfo());
    databaseStorage.saveToDatabase(triangle.getInfo());
    
    consoleDisplay.display(circle.getInfo());
    consoleDisplay.display(rectangle.getInfo());
    consoleDisplay.display(triangle.getInfo());
}

// ❌ НАРУШЕНИЕ DIP: Функция для сравнения фигур зависит от конкретных типов
function badCompareShapes(): void {
    // ❌ ПРОБЛЕМА: Функция создает конкретные объекты внутри себя
    const circle = badCreateCircle(5);
    const rectangle = badCreateRectangle(4, 6);
    const triangle = badCreateTriangle(3, 4, 5);
    
    const fileStorage = badCreateFileStorage();
    const consoleDisplay = badCreateConsoleDisplay();
    
    const shapes = [circle, rectangle, triangle];
    
    // ❌ ПРОБЛЕМА: Нужно знать конкретные типы для правильной обработки
    shapes.forEach((shape, index) => {
        if (shape.type === 'circle') {
            const circleShape = shape as Circle;
            fileStorage.saveToFile(`Circle ${index + 1}: ${circleShape.getInfo()}`);
            consoleDisplay.display(`Circle ${index + 1}: ${circleShape.getInfo()}`);
        } else if (shape.type === 'rectangle') {
            const rectangleShape = shape as Rectangle;
            fileStorage.saveToFile(`Rectangle ${index + 1}: ${rectangleShape.getInfo()}`);
            consoleDisplay.display(`Rectangle ${index + 1}: ${rectangleShape.getInfo()}`);
        } else if (shape.type === 'triangle') {
            const triangleShape = shape as Triangle;
            fileStorage.saveToFile(`Triangle ${index + 1}: ${triangleShape.getInfo()}`);
            consoleDisplay.display(`Triangle ${index + 1}: ${triangleShape.getInfo()}`);
        }
    });
    
    // Находим фигуру с максимальной площадью
    const largestShape = shapes.reduce((largest, current) => {
        return current.getArea() > largest.getArea() ? current : largest;
    });
    
    const largestInfo = `Largest shape: ${largestShape.getInfo()} - Area: ${largestShape.getArea().toFixed(2)}`;
    fileStorage.saveToFile(largestInfo);
    consoleDisplay.display(largestInfo);
}

// ❌ НАРУШЕНИЕ DIP: Функция для генерации отчетов зависит от конкретных типов
function badGenerateReport(): void {
    // ❌ ПРОБЛЕМА: Функция создает конкретные объекты внутри себя
    const circle = badCreateCircle(5);
    const rectangle = badCreateRectangle(4, 6);
    const triangle = badCreateTriangle(3, 4, 5);
    
    const cloudStorage = badCreateCloudStorage();
    const pdfDisplay = badCreatePDFDisplay();
    
    const shapes = [circle, rectangle, triangle];
    
    const report = `
        Shape Report:
        ${shapes.map((shape, index) => 
            `${index + 1}. ${shape.getInfo()}: Area = ${shape.getArea().toFixed(2)}, Perimeter = ${shape.getPerimeter().toFixed(2)}`
        ).join('\n        ')}
        
        Total shapes: ${shapes.length}
        Total area: ${shapes.reduce((sum, shape) => sum + shape.getArea(), 0).toFixed(2)}
    `;
    
    cloudStorage.saveToCloud(report);
    pdfDisplay.display(report);
}

// ❌ НАРУШЕНИЕ DIP: Функция для валидации фигур зависит от конкретных типов
function badValidateShapes(): void {
    // ❌ ПРОБЛЕМА: Функция создает конкретные объекты внутри себя
    const circle = badCreateCircle(5);
    const rectangle = badCreateRectangle(4, 6);
    const triangle = badCreateTriangle(3, 4, 5);
    
    const shapes = [circle, rectangle, triangle];
    
    // ❌ ПРОБЛЕМА: Нужно знать конкретные типы для правильной валидации
    shapes.forEach(shape => {
        if (shape.type === 'circle') {
            const circleShape = shape as Circle;
            const isValid = circleShape.radius > 0 && circleShape.radius <= 1000;
            console.log(`Circle validation: ${isValid ? 'PASS' : 'FAIL'}`);
        } else if (shape.type === 'rectangle') {
            const rectangleShape = shape as Rectangle;
            const isValid = rectangleShape.width > 0 && rectangleShape.height > 0 && 
                           rectangleShape.width <= 1000 && rectangleShape.height <= 1000;
            console.log(`Rectangle validation: ${isValid ? 'PASS' : 'FAIL'}`);
        } else if (shape.type === 'triangle') {
            const triangleShape = shape as Triangle;
            const isValid = triangleShape.side1 > 0 && triangleShape.side2 > 0 && triangleShape.side3 > 0;
            console.log(`Triangle validation: ${isValid ? 'PASS' : 'FAIL'}`);
        }
    });
}

// Использование - демонстрация проблем
console.log('=== Individual shape processing:');
const circle = badCreateCircle(5);
const rectangle = badCreateRectangle(4, 6);
const triangle = badCreateTriangle(3, 4, 5);

badCalculateCircleArea(circle);
badCalculateRectangleArea(rectangle);
badCalculateTriangleArea(triangle);

console.log('\n=== Processing all shapes:');
badProcessAllShapes();

console.log('\n=== Shape comparison:');
badCompareShapes();

console.log('\n=== Report generation:');
badGenerateReport();

console.log('\n=== Shape validation:');
badValidateShapes(); 