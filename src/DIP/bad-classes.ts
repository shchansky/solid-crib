// ❌ ПЛОХО: Нарушение DIP - классы зависят от конкретных реализаций, а не от абстракций
//
// 🔄 НАРУШЕНИЕ ОСНОВНОЙ ИДЕИ DIP:
// 1. ❌ ВЫСОКОУРОВНЕВЫЕ МОДУЛИ ЗАВИСЯТ ОТ НИЗКОУРОВНЕВЫХ
//    - BadShapeCalculator (высокоуровневый) зависит от Circle, Rectangle, Triangle (низкоуровневые)
//    - BadShapeCalculator создает конкретные объекты: new Circle(), new Rectangle(), new Triangle()
//
// 2. ❌ НЕ ОБА ТИПА ЗАВИСЯТ ОТ АБСТРАКЦИЙ
//    - Высокоуровневые модули: BadShapeCalculator зависит от FileStorage, DatabaseStorage (конкретные)
//    - Низкоуровневые модули: Circle, Rectangle, Triangle НЕ реализуют общий интерфейс
//
// 3. ❌ АБСТРАКЦИИ ЗАВИСЯТ ОТ ДЕТАЛЕЙ (их просто нет!)
//    - Нет интерфейсов Shape, Storage, Display
//    - Все зависимости направлены к конкретным классам
//
// 4. ❌ ДЕТАЛИ НЕ ЗАВИСЯТ ОТ АБСТРАКЦИЙ
//    - Circle, Rectangle, Triangle НЕ реализуют общий интерфейс
//    - FileStorage, DatabaseStorage НЕ реализуют общий интерфейс
//
// ПРОБЛЕМЫ:
// 1. Жесткая связанность - классы зависят от конкретных классов
// 2. Нарушение принципа инверсии зависимостей - зависимости направлены к конкретным реализациям
// 3. Сложность тестирования - нельзя легко заменить зависимости
// 4. Нарушение принципа открытости/закрытости - изменения в зависимостях влияют на основной класс
// 5. Сложность расширения - добавление новых типов требует изменения существующего кода

// ❌ НАРУШЕНИЕ DIP: Конкретные классы для разных типов фигур
// 🔄 ПРОБЛЕМА: Нет общего интерфейса - детали не зависят от абстракций
class BadCircle {
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

class BadRectangle {
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

class BadTriangle {
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

// ❌ НАРУШЕНИЕ DIP: Конкретные классы для разных типов сохранения
// 🔄 ПРОБЛЕМА: Нет общего интерфейса - детали не зависят от абстракций
class BadFileStorage {
    saveToFile(data: string): void {
        console.log(`Saving to file: ${data}`);
    }
}

class BadDatabaseStorage {
    saveToDatabase(data: string): void {
        console.log(`Saving to database: ${data}`);
    }
}

class BadCloudStorage {
    saveToCloud(data: string): void {
        console.log(`Saving to cloud: ${data}`);
    }
}

// ❌ НАРУШЕНИЕ DIP: Конкретные классы для разных типов отображения
// 🔄 ПРОБЛЕМА: Нет общего интерфейса - детали не зависят от абстракций
class BadConsoleDisplay {
    display(data: string): void {
        console.log(`Console: ${data}`);
    }
}

class BadHTMLDisplay {
    display(data: string): void {
        console.log(`HTML: ${data}`);
    }
}

class BadPDFDisplay {
    display(data: string): void {
        console.log(`PDF: ${data}`);
    }
}

// ❌ НАРУШЕНИЕ DIP: Класс зависит от конкретных реализаций
// 🔄 ПРОБЛЕМА: Высокоуровневый модуль зависит от низкоуровневых
class BadShapeCalculator {
    // ❌ ПРОБЛЕМА: Зависимость от конкретных классов
    // 🔄 НАРУШЕНИЕ: Высокоуровневый модуль зависит от низкоуровневых
    private fileStorage: BadFileStorage;
    private databaseStorage: BadDatabaseStorage;
    private consoleDisplay: BadConsoleDisplay;

    constructor() {
        // ❌ НАРУШЕНИЕ DIP: Создание конкретных зависимостей внутри класса
        // 🔄 НАРУШЕНИЕ: Высокоуровневый модуль создает низкоуровневые модули
        this.fileStorage = new BadFileStorage();
        this.databaseStorage = new BadDatabaseStorage();
        this.consoleDisplay = new BadConsoleDisplay();
    }

    // ❌ ПРОБЛЕМА: Методы зависят от конкретных типов фигур
    // 🔄 НАРУШЕНИЕ: Высокоуровневый модуль зависит от низкоуровневых
    calculateCircleArea(radius: number): void {
        const circle = new BadCircle(radius); // ❌ Создание конкретного объекта
        const area = circle.getArea();
        
        this.fileStorage.saveToFile(`Circle area: ${area}`);
        this.databaseStorage.saveToDatabase(`Circle area: ${area}`);
        this.consoleDisplay.display(`Circle area: ${area}`);
    }

    calculateRectangleArea(width: number, height: number): void {
        const rectangle = new BadRectangle(width, height); // ❌ Создание конкретного объекта
        const area = rectangle.getArea();
        
        this.fileStorage.saveToFile(`Rectangle area: ${area}`);
        this.databaseStorage.saveToDatabase(`Rectangle area: ${area}`);
        this.consoleDisplay.display(`Rectangle area: ${area}`);
    }

    calculateTriangleArea(side1: number, side2: number, side3: number): void {
        const triangle = new BadTriangle(side1, side2, side3); // ❌ Создание конкретного объекта
        const area = triangle.getArea();
        
        this.fileStorage.saveToFile(`Triangle area: ${area}`);
        this.databaseStorage.saveToDatabase(`Triangle area: ${area}`);
        this.consoleDisplay.display(`Triangle area: ${area}`);
    }

    // ❌ ПРОБЛЕМА: Метод для обработки всех фигур зависит от конкретных типов
    // 🔄 НАРУШЕНИЕ: Высокоуровневый модуль зависит от низкоуровневых
    processAllShapes(): void {
        const circle = new BadCircle(5);      // ❌ Создание конкретного объекта
        const rectangle = new BadRectangle(4, 6); // ❌ Создание конкретного объекта
        const triangle = new BadTriangle(3, 4, 5); // ❌ Создание конкретного объекта

        this.fileStorage.saveToFile(circle.getInfo());
        this.fileStorage.saveToFile(rectangle.getInfo());
        this.fileStorage.saveToFile(triangle.getInfo());

        this.databaseStorage.saveToDatabase(circle.getInfo());
        this.databaseStorage.saveToDatabase(rectangle.getInfo());
        this.databaseStorage.saveToDatabase(triangle.getInfo());

        this.consoleDisplay.display(circle.getInfo());
        this.consoleDisplay.display(rectangle.getInfo());
        this.consoleDisplay.display(triangle.getInfo());
    }
}

// ❌ НАРУШЕНИЕ DIP: Класс для сравнения фигур зависит от конкретных типов
class BadShapeComparator {
    private fileStorage: FileStorage;
    private consoleDisplay: ConsoleDisplay;

    constructor() {
        // ❌ НАРУШЕНИЕ DIP: Создание конкретных зависимостей внутри класса
        this.fileStorage = new FileStorage();
        this.consoleDisplay = new ConsoleDisplay();
    }

    // ❌ ПРОБЛЕМА: Метод знает о конкретных типах фигур
    compareShapes(): void {
        const circle = new Circle(5);
        const rectangle = new Rectangle(4, 6);
        const triangle = new Triangle(3, 4, 5);

        const shapes = [circle, rectangle, triangle];
        
        // ❌ ПРОБЛЕМА: Нужно знать конкретные типы для правильной обработки
        shapes.forEach(shape => {
            if (shape instanceof Circle) {
                this.fileStorage.saveToFile(`Circle: ${shape.getInfo()}`);
                this.consoleDisplay.display(`Circle: ${shape.getInfo()}`);
            } else if (shape instanceof Rectangle) {
                this.fileStorage.saveToFile(`Rectangle: ${shape.getInfo()}`);
                this.consoleDisplay.display(`Rectangle: ${shape.getInfo()}`);
            } else if (shape instanceof Triangle) {
                this.fileStorage.saveToFile(`Triangle: ${shape.getInfo()}`);
                this.consoleDisplay.display(`Triangle: ${shape.getInfo()}`);
            }
        });
    }
}

// ❌ НАРУШЕНИЕ DIP: Класс для генерации отчетов зависит от конкретных типов
class BadReportGenerator {
    private fileStorage: FileStorage;
    private databaseStorage: DatabaseStorage;
    private htmlDisplay: HTMLDisplay;

    constructor() {
        // ❌ НАРУШЕНИЕ DIP: Создание конкретных зависимостей внутри класса
        this.fileStorage = new FileStorage();
        this.databaseStorage = new DatabaseStorage();
        this.htmlDisplay = new HTMLDisplay();
    }

    // ❌ ПРОБЛЕМА: Метод создает конкретные объекты внутри себя
    generateReport(): void {
        const circle = new Circle(5);
        const rectangle = new Rectangle(4, 6);
        const triangle = new Triangle(3, 4, 5);

        const report = `
            Shape Report:
            - ${circle.getInfo()}: Area = ${circle.getArea().toFixed(2)}
            - ${rectangle.getInfo()}: Area = ${rectangle.getArea().toFixed(2)}
            - ${triangle.getInfo()}: Area = ${triangle.getArea().toFixed(2)}
        `;

        this.fileStorage.saveToFile(report);
        this.databaseStorage.saveToDatabase(report);
        this.htmlDisplay.display(report);
    }
}

// Использование - демонстрация проблем
const badCalculator = new BadShapeCalculator();
const badComparator = new BadShapeComparator();
const badReportGenerator = new BadReportGenerator();

console.log('=== BadShapeCalculator:');
badCalculator.calculateCircleArea(5);
badCalculator.calculateRectangleArea(4, 6);
badCalculator.calculateTriangleArea(3, 4, 5);

console.log('\n=== BadShapeComparator:');
badComparator.compareShapes();

console.log('\n=== BadReportGenerator:');
badReportGenerator.generateReport(); 