// ✅ ХОРОШО: Соблюдение DIP - классы зависят от абстракций, а не от конкретных реализаций
//
// 🔄 ОСНОВНАЯ ИДЕЯ DIP:
// 1. ВЫСОКОУРОВНЕВЫЕ МОДУЛИ НЕ ДОЛЖНЫ ЗАВИСЕТЬ ОТ НИЗКОУРОВНЕВЫХ
//    - GoodShapeCalculator (высокоуровневый) НЕ зависит от Circle, Rectangle, Triangle (низкоуровневые)
//    - Вместо этого он зависит от интерфейса Shape (абстракция)
//
// 2. ОБА ТИПА ДОЛЖНЫ ЗАВИСЕТЬ ОТ АБСТРАКЦИЙ
//    - Высокоуровневые модули: GoodShapeCalculator зависит от Shape, Storage, Display
//    - Низкоуровневые модули: Circle, Rectangle, Triangle реализуют Shape
//
// 3. АБСТРАКЦИИ НЕ ДОЛЖНЫ ЗАВИСЕТЬ ОТ ДЕТАЛЕЙ
//    - Интерфейс Shape НЕ знает о конкретных реализациях Circle, Rectangle, Triangle
//    - Интерфейс Storage НЕ знает о FileStorage, DatabaseStorage, CloudStorage
//
// 4. ДЕТАЛИ ДОЛЖНЫ ЗАВИСЕТЬ ОТ АБСТРАКЦИЙ
//    - Circle, Rectangle, Triangle реализуют интерфейс Shape
//    - FileStorage, DatabaseStorage, CloudStorage реализуют интерфейс Storage
//
// ПРЕИМУЩЕСТВА:
// 1. Слабая связанность - классы зависят от абстракций
// 2. Соблюдение принципа инверсии зависимостей - зависимости направлены к абстракциям
// 3. Легкость тестирования - можно легко заменить зависимости
// 4. Соблюдение принципа открытости/закрытости - изменения в зависимостях не влияют на основной класс
// 5. Простота расширения - добавление новых типов не требует изменения существующего кода

// ✅ DIP: Абстракции (интерфейсы) - высокоуровневые модули зависят от них
// 🔄 ПРИНЦИП: Абстракции не должны зависеть от деталей

// Абстракция для фигур
interface Shape {
    getArea(): number;
    getPerimeter(): number;
    getInfo(): string;
}

// Абстракция для сохранения данных
interface Storage {
    save(data: string): void;
}

// Абстракция для отображения данных
interface Display {
    show(data: string): void;
}

// Абстракция для валидации фигур
interface ShapeValidator {
    validate(shape: Shape): boolean;
}

// Абстракция для создания фигур
interface ShapeFactory {
    createShape(params: any): Shape;
}

// ✅ DIP: Конкретные реализации - низкоуровневые модули реализуют абстракции
// 🔄 ПРИНЦИП: Детали должны зависеть от абстракций

// Конкретные реализации фигур
class Circle implements Shape {
    constructor(private radius: number) {}

    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    getInfo(): string {
        return `Circle: radius=${this.radius}`;
    }
}

class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}

    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }

    getInfo(): string {
        return `Rectangle: ${this.width}x${this.height}`;
    }
}

class Triangle implements Shape {
    constructor(private side1: number, private side2: number, private side3: number) {}

    getArea(): number {
        const s = (this.side1 + this.side2 + this.side3) / 2;
        return Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
    }

    getPerimeter(): number {
        return this.side1 + this.side2 + this.side3;
    }

    getInfo(): string {
        return `Triangle: sides=${this.side1},${this.side2},${this.side3}`;
    }
}

// Конкретные реализации хранилищ
class FileStorage implements Storage {
    save(data: string): void {
        console.log(`Saving to file: ${data}`);
    }
}

class DatabaseStorage implements Storage {
    save(data: string): void {
        console.log(`Saving to database: ${data}`);
    }
}

class CloudStorage implements Storage {
    save(data: string): void {
        console.log(`Saving to cloud: ${data}`);
    }
}

// Конкретные реализации отображения
class ConsoleDisplay implements Display {
    show(data: string): void {
        console.log(`Console: ${data}`);
    }
}

class HTMLDisplay implements Display {
    show(data: string): void {
        console.log(`HTML: ${data}`);
    }
}

class PDFDisplay implements Display {
    show(data: string): void {
        console.log(`PDF: ${data}`);
    }
}

// Конкретные реализации валидаторов
class BasicShapeValidator implements ShapeValidator {
    validate(shape: Shape): boolean {
        return shape.getArea() > 0 && shape.getPerimeter() > 0;
    }
}

class AdvancedShapeValidator implements ShapeValidator {
    validate(shape: Shape): boolean {
        const basicValid = shape.getArea() > 0 && shape.getPerimeter() > 0;
        const areaValid = shape.getArea() <= 10000; // Максимальная площадь
        const perimeterValid = shape.getPerimeter() <= 1000; // Максимальный периметр
        return basicValid && areaValid && perimeterValid;
    }
}

// Конкретные реализации фабрик
class CircleFactory implements ShapeFactory {
    createShape(params: { radius: number }): Shape {
        return new Circle(params.radius);
    }
}

class RectangleFactory implements ShapeFactory {
    createShape(params: { width: number; height: number }): Shape {
        return new Rectangle(params.width, params.height);
    }
}

class TriangleFactory implements ShapeFactory {
    createShape(params: { side1: number; side2: number; side3: number }): Shape {
        return new Triangle(params.side1, params.side2, params.side3);
    }
}

// ✅ DIP: Высокоуровневые модули зависят от абстракций
// 🔄 ПРИНЦИП: Высокоуровневые модули не должны зависеть от низкоуровневых

// Класс для расчета фигур - зависит от абстракций
class GoodShapeCalculator {
    // ✅ DIP: Зависимость от абстракций, а не от конкретных классов
    // 🔄 ПРИНЦИП: Оба типа должны зависеть от абстракций
    constructor(
        private storage: Storage,        // ✅ Абстракция, а не FileStorage
        private display: Display,        // ✅ Абстракция, а не ConsoleDisplay
        private validator: ShapeValidator // ✅ Абстракция, а не BasicShapeValidator
    ) {}

    // ✅ DIP: Метод работает с абстракцией Shape, а не с конкретными типами
    // 🔄 ПРИНЦИП: Высокоуровневые модули не должны зависеть от низкоуровневых
    calculateShape(shape: Shape): void {
        // ✅ Работаем с абстракцией Shape, а не с Circle, Rectangle, Triangle
        if (!this.validator.validate(shape)) {
            throw new Error('Invalid shape');
        }

        const area = shape.getArea();      // ✅ Абстракция
        const perimeter = shape.getPerimeter(); // ✅ Абстракция
        const info = shape.getInfo();      // ✅ Абстракция

        const result = `${info} - Area: ${area.toFixed(2)}, Perimeter: ${perimeter.toFixed(2)}`;

        this.storage.save(result);  // ✅ Используем абстракцию Storage
        this.display.show(result);  // ✅ Используем абстракцию Display
    }

    // ✅ DIP: Метод для обработки массива фигур - работает с абстракцией
    processShapes(shapes: Shape[]): void {
        console.log('Processing shapes...');
        shapes.forEach((shape, index) => {
            console.log(`\n--- Shape ${index + 1} ---`);
            this.calculateShape(shape);
        });
    }
}

// Класс для сравнения фигур - зависит от абстракций
class GoodShapeComparator {
    constructor(
        private storage: Storage,
        private display: Display
    ) {}

    // ✅ DIP: Метод работает с абстракцией Shape, а не с конкретными типами
    compareShapes(shapes: Shape[]): void {
        console.log('Comparing shapes...');
        
        shapes.forEach((shape, index) => {
            const info = `${index + 1}. ${shape.getInfo()} - Area: ${shape.getArea().toFixed(2)}`;
            this.storage.save(info);
            this.display.show(info);
        });

        // Находим фигуру с максимальной площадью
        const largestShape = shapes.reduce((largest, current) => {
            return current.getArea() > largest.getArea() ? current : largest;
        });

        const largestInfo = `Largest shape: ${largestShape.getInfo()} - Area: ${largestShape.getArea().toFixed(2)}`;
        this.storage.save(largestInfo);
        this.display.show(largestInfo);
    }
}

// Класс для генерации отчетов - зависит от абстракций
class GoodReportGenerator {
    constructor(
        private storage: Storage,
        private display: Display,
        private shapeFactory: ShapeFactory
    ) {}

    // ✅ DIP: Метод работает с абстракциями, а не создает конкретные объекты
    generateReport(shapeParams: any[]): void {
        console.log('Generating report...');
        
        const shapes: Shape[] = shapeParams.map(params => this.shapeFactory.createShape(params));
        
        const report = `
            Shape Report:
            ${shapes.map((shape, index) => 
                `${index + 1}. ${shape.getInfo()}: Area = ${shape.getArea().toFixed(2)}, Perimeter = ${shape.getPerimeter().toFixed(2)}`
            ).join('\n            ')}
            
            Total shapes: ${shapes.length}
            Total area: ${shapes.reduce((sum, shape) => sum + shape.getArea(), 0).toFixed(2)}
        `;

        this.storage.save(report);
        this.display.show(report);
    }
}

// ✅ DIP: Класс для управления фигурами - зависит от абстракций
class ShapeManager {
    constructor(
        private calculator: GoodShapeCalculator,
        private comparator: GoodShapeComparator,
        private reportGenerator: GoodReportGenerator
    ) {}

    // ✅ DIP: Метод работает с абстракциями
    processShapeCollection(shapes: Shape[]): void {
        console.log('=== Processing shape collection ===');
        
        this.calculator.processShapes(shapes);
        this.comparator.compareShapes(shapes);
        
        const shapeParams = shapes.map(shape => {
            if (shape instanceof Circle) {
                return { radius: (shape as any).radius };
            } else if (shape instanceof Rectangle) {
                return { width: (shape as any).width, height: (shape as any).height };
            } else if (shape instanceof Triangle) {
                return { side1: (shape as any).side1, side2: (shape as any).side2, side3: (shape as any).side3 };
            }
            return {};
        });
        
        this.reportGenerator.generateReport(shapeParams);
    }
}

// Использование - демонстрация правильного применения DIP

// Создание зависимостей (в реальном приложении это делается через DI контейнер)
const fileStorage = new FileStorage();
const databaseStorage = new DatabaseStorage();
const cloudStorage = new CloudStorage();

const consoleDisplay = new ConsoleDisplay();
const htmlDisplay = new HTMLDisplay();
const pdfDisplay = new PDFDisplay();

const basicValidator = new BasicShapeValidator();
const advancedValidator = new AdvancedShapeValidator();

const circleFactory = new CircleFactory();
const rectangleFactory = new RectangleFactory();
const triangleFactory = new TriangleFactory();

// Создание высокоуровневых модулей с инъекцией зависимостей
const calculator = new GoodShapeCalculator(fileStorage, consoleDisplay, basicValidator);
const comparator = new GoodShapeComparator(databaseStorage, htmlDisplay);
const reportGenerator = new GoodReportGenerator(cloudStorage, pdfDisplay, circleFactory);

const shapeManager = new ShapeManager(calculator, comparator, reportGenerator);

// Создание фигур через фабрики
const circle = circleFactory.createShape({ radius: 5 });
const rectangle = rectangleFactory.createShape({ width: 4, height: 6 });
const triangle = triangleFactory.createShape({ side1: 3, side2: 4, side3: 5 });

const shapes = [circle, rectangle, triangle];

console.log('=== Individual shape processing:');
calculator.calculateShape(circle);
calculator.calculateShape(rectangle);
calculator.calculateShape(triangle);

console.log('\n=== Shape comparison:');
comparator.compareShapes(shapes);

console.log('\n=== Report generation:');
reportGenerator.generateReport([
    { radius: 5 },
    { width: 4, height: 6 },
    { side1: 3, side2: 4, side3: 5 }
]);

console.log('\n=== Shape collection management:');
shapeManager.processShapeCollection(shapes); 