// ✅ ХОРОШО: Соблюдение LSP - подклассы могут заменить базовый класс
//
// ПРЕИМУЩЕСТВА:
// 1. Соблюдение контракта - подклассы выполняют все обещания базового класса
// 2. Предсказуемое поведение - код работает одинаково с любым подклассом
// 3. Истинная подстановка - подклассы являются истинными подтипами
// 4. Легкость тестирования - можно тестировать с любым подклассом
// 5. Полиморфизм - код работает с базовым типом, не зная конкретный подкласс

// Базовый интерфейс - определяет контракт для всех фигур

// Жесткий формат: "ИМЯ: Area=ЧИСЛО, Perimeter=ЧИСЛО"
type InfoType = `${string}: Area=${string}, Perimeter=${string}`;
interface Shape {
    getArea(): number;
    getPerimeter(): number;
    // Жесткий формат: "ИМЯ: Area=ЧИСЛО, Perimeter=ЧИСЛО"
    getInfo(): InfoType;
}

// ✅ LSP: Rectangle - истинный подтип Shape
// Выполняет все обещания интерфейса Shape
class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}

    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }

    // ✅ LSP: Строго следует контракту формата
    getInfo(): `${string}: Area=${string}, Perimeter=${string}` {
        return `Rectangle: Area=${this.getArea().toFixed(2)}, Perimeter=${this.getPerimeter().toFixed(2)}`;
    }

    // ✅ LSP: Дополнительные методы не нарушают контракт
    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }
}

// ✅ LSP: Circle - истинный подтип Shape
// Выполняет все обещания интерфейса Shape
class Circle implements Shape {
    constructor(private radius: number) {}

    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    // ✅ LSP: Строго следует контракту формата
    getInfo(): `${string}: Area=${string}, Perimeter=${string}` {
        return `Circle: Area=${this.getArea().toFixed(2)}, Perimeter=${this.getPerimeter().toFixed(2)}`;
    }

    // ✅ LSP: Дополнительные методы не нарушают контракт
    getRadius(): number {
        return this.radius;
    }

    getDiameter(): number {
        return 2 * this.radius;
    }
}

// ✅ LSP: Triangle - истинный подтип Shape
// Выполняет все обещания интерфейса Shape
class Triangle implements Shape {
    constructor(private side1: number, private side2: number, private side3: number) {}

    getArea(): number {
        // Формула Герона для треугольника
        const s = (this.side1 + this.side2 + this.side3) / 2;
        return Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
    }

    getPerimeter(): number {
        return this.side1 + this.side2 + this.side3;
    }

    // ✅ LSP: Строго следует контракту формата
    getInfo(): `${string}: Area=${string}, Perimeter=${string}` {
        return `Triangle: Area=${this.getArea().toFixed(2)}, Perimeter=${this.getPerimeter().toFixed(2)}`;
    }

    // ✅ LSP: Дополнительные методы не нарушают контракт
    isEquilateral(): boolean {
        return this.side1 === this.side2 && this.side2 === this.side3;
    }

}




// Использование - демонстрация правильной подстановки
const rectangle = new Rectangle(4, 6);
const circle = new Circle(5);
const triangle = new Triangle(3, 4, 5);


function processShapes(shapes: Shape[]): {summaryArea: number, summaryPerimeter: number, summaryInfo: InfoType[]} {


    let summaryArea = 0;
    let summaryPerimeter = 0;
    let summaryInfo: InfoType[] = [];

    shapes.forEach((shape) => {
        summaryArea += shape.getArea();
        summaryPerimeter += shape.getPerimeter();
        summaryInfo.push(shape.getInfo());
    });

    return {
        summaryArea,
        summaryPerimeter,
        summaryInfo
    }

}

processShapes([rectangle, circle, triangle])

export {}