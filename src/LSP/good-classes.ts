// ✅ ХОРОШО: Соблюдение LSP - классы-наследники могут заменить базовый класс
//
// 🔄 ОСНОВНАЯ ИДЕЯ LSP:
// 1. ✅ СОБЛЮДЕНИЕ КОНТРАКТА - классы-наследники выполняют все обещания базового класса
// 2. ✅ ПРЕДСКАЗУЕМОЕ ПОВЕДЕНИЕ - код работает одинаково с любым классом-наследником
// 3. ✅ ИСТИННАЯ ПОДСТАНОВКА - классы-наследники являются истинными подтипами
// 4. ✅ ЛЕГКОСТЬ ТЕСТИРОВАНИЯ - можно тестировать с любым классом-наследником
// 5. ✅ ПОЛИМОРФИЗМ - код работает с базовым типом, не зная конкретный класс-наследник
//
// ПРЕИМУЩЕСТВА:
// 1. Соблюдение контракта - классы-наследники выполняют все обещания базового класса
// 2. Предсказуемое поведение - код работает одинаково с любым классом-наследником
// 3. Истинная подстановка - классы-наследники являются истинными подтипами
// 4. Легкость тестирования - можно тестировать с любым классом-наследником
// 5. Полиморфизм - код работает с базовым типом, не зная конкретный класс-наследник

// ✅ LSP: Базовый интерфейс - определяет контракт для всех фигур
// 💡 ПРЕИМУЩЕСТВО: Четкий контракт, который все подклассы должны соблюдать
// 🎯 РЕЗУЛЬТАТ: Предсказуемое поведение всех подтипов

// Жесткий формат: "ИМЯ: Area=ЧИСЛО, Perimeter=ЧИСЛО"
type InfoType = `${string}: Area=${string}, Perimeter=${string}`;
interface Shape {
    getArea(): number;
    getPerimeter(): number;
    // Жесткий формат: "ИМЯ: Area=ЧИСЛО, Perimeter=ЧИСЛО"
    getInfo(): InfoType;
}

// ✅ LSP: Rectangle - истинный подтип Shape
// 💡 ПРЕИМУЩЕСТВО: Выполняет все обещания интерфейса Shape
// 🎯 РЕЗУЛЬТАТ: Может заменить любой объект типа Shape
class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}

    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }

    // ✅ LSP: Строго следует контракту формата
    // 💡 ПРЕИМУЩЕСТВО: Возвращает информацию в ожидаемом формате
    // 🎯 РЕЗУЛЬТАТ: Предсказуемое поведение для клиентов
    getInfo(): `${string}: Area=${string}, Perimeter=${string}` {
        return `Rectangle: Area=${this.getArea().toFixed(2)}, Perimeter=${this.getPerimeter().toFixed(2)}`;
    }

    // ✅ LSP: Дополнительные методы не нарушают контракт
    // 💡 ПРЕИМУЩЕСТВО: Расширяет функциональность без нарушения LSP
    // 🎯 РЕЗУЛЬТАТ: Гибкость без нарушения принципа подстановки
    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }
}

// ✅ LSP: Circle - истинный подтип Shape
// 💡 ПРЕИМУЩЕСТВО: Выполняет все обещания интерфейса Shape
// 🎯 РЕЗУЛЬТАТ: Может заменить любой объект типа Shape
class Circle implements Shape {
    constructor(private radius: number) {}

    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    // ✅ LSP: Строго следует контракту формата
    // 💡 ПРЕИМУЩЕСТВО: Возвращает информацию в ожидаемом формате
    // 🎯 РЕЗУЛЬТАТ: Предсказуемое поведение для клиентов
    getInfo(): `${string}: Area=${string}, Perimeter=${string}` {
        return `Circle: Area=${this.getArea().toFixed(2)}, Perimeter=${this.getPerimeter().toFixed(2)}`;
    }

    // ✅ LSP: Дополнительные методы не нарушают контракт
    // 💡 ПРЕИМУЩЕСТВО: Расширяет функциональность без нарушения LSP
    // 🎯 РЕЗУЛЬТАТ: Гибкость без нарушения принципа подстановки
    getRadius(): number {
        return this.radius;
    }

    getDiameter(): number {
        return 2 * this.radius;
    }
}

// ✅ LSP: Triangle - истинный подтип Shape
// 💡 ПРЕИМУЩЕСТВО: Выполняет все обещания интерфейса Shape
// 🎯 РЕЗУЛЬТАТ: Может заменить любой объект типа Shape
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
    // 💡 ПРЕИМУЩЕСТВО: Возвращает информацию в ожидаемом формате
    // 🎯 РЕЗУЛЬТАТ: Предсказуемое поведение для клиентов
    getInfo(): `${string}: Area=${string}, Perimeter=${string}` {
        return `Triangle: Area=${this.getArea().toFixed(2)}, Perimeter=${this.getPerimeter().toFixed(2)}`;
    }

    // ✅ LSP: Дополнительные методы не нарушают контракт
    // 💡 ПРЕИМУЩЕСТВО: Расширяет функциональность без нарушения LSP
    // 🎯 РЕЗУЛЬТАТ: Гибкость без нарушения принципа подстановки
    isEquilateral(): boolean {
        return this.side1 === this.side2 && this.side2 === this.side3;
    }
}

// ✅ LSP: Функция работает с любыми подтипами Shape
// 💡 ПРЕИМУЩЕСТВО: Не нужно знать конкретный тип фигуры
// 🎯 РЕЗУЛЬТАТ: Полиморфизм работает автоматически
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

// ✅ ДЕМОНСТРАЦИЯ ПРЕИМУЩЕСТВ: Правильная подстановка
// 💡 ПРЕИМУЩЕСТВО: Любой подкласс может заменить базовый класс
// 🎯 РЕЗУЛЬТАТ: Предсказуемое поведение системы
const rectangle = new Rectangle(4, 6);
const circle = new Circle(5);
const triangle = new Triangle(3, 4, 5);

processShapes([rectangle, circle, triangle]);