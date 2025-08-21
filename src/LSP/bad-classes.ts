// ❌ ПЛОХО: Нарушение LSP - подклассы не могут заменить базовый класс
//
// ПРОБЛЕМЫ:
// 1. Нарушение контракта - подклассы не выполняют обещания базового класса
// 2. Неожиданное поведение - код может сломаться при замене базового класса на подкласс
// 3. Нарушение принципа подстановки - подклассы не являются истинными подтипами
// 4. Сложность тестирования - нужно тестировать каждый подкласс отдельно
// 5. Нарушение полиморфизма - код должен знать конкретный тип объекта

// Базовый класс для фигур
class LspBadShape {
    protected width: number;
    protected height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    // Базовый метод - обещает вернуть площадь
    getArea(): number {
        return this.width * this.height;
    }

    // Базовый метод - обещает вернуть периметр
    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }

    // Базовый метод - обещает вернуть информацию о фигуре
    getInfo(): string {
        return `Shape: ${this.width}x${this.height}`;
    }
}

// ❌ НАРУШЕНИЕ LSP: Круг не может заменить Shape
// Круг имеет только радиус, а не ширину и высоту
class LspBadCircle extends LspBadShape {
    private radius: number;

    constructor(radius: number) {
        // ❌ ПРОБЛЕМА: Передаем радиус как width и height, что нелогично
        super(radius * 2, radius * 2);
        this.radius = radius;
    }

    // ❌ НАРУШЕНИЕ LSP: Переопределяем getArea() с другим поведением (хотя это правильно для круга)
    getArea(): number {
        return Math.PI * this.radius * this.radius; 
    }

    // ❌ НАРУШЕНИЕ LSP: Переопределяем getPerimeter() с другим поведением (вместо длины окружности возвращаем, например, диаметр)
    getPerimeter(): number {
        return 2 * this.radius; // ❌ Это диаметр, не периметр!
    }

    // ❌ НАРУШЕНИЕ LSP: Переопределяем getInfo() с другим форматом
    getInfo(): string {
        return `Circle: radius=${this.radius}`; // Другой формат информации
    }
}

// ❌ НАРУШЕНИЕ LSP: Треугольник не может заменить Shape
class LspBadTriangle extends LspBadShape {
    private side1: number;
    private side2: number;
    private side3: number;

    constructor(side1: number, side2: number, side3: number) {
        // ❌ ПРОБЛЕМА: Передаем стороны как width и height, что нелогично
        super(side1, side2);
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }

    // ❌ НАРУШЕНИЕ LSP: Переопределяем getArea() с другим поведением (хотя это правильно для треугольника)
    //
    getArea(): number {
        // Формула Герона для треугольника
        const s = (this.side1 + this.side2 + this.side3) / 2;
        return Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
    }

    // ❌ НАРУШЕНИЕ LSP: Переопределяем getPerimeter() с другим поведением (хотя это правильно для треугольника)
    getPerimeter(): number {
        return this.side1 + this.side2 + this.side3; // Правильно для треугольника
    }

    // ❌ НАРУШЕНИЕ LSP: Переопределяем getInfo() с другим форматом
    getInfo(): string {
        return `Triangle: sides=${this.side1},${this.side2},${this.side3}`; // Другой формат информации
    }
}

// Функция, которая ожидает Shape, но может сломаться с подклассами
function lspBadProcessShape(shape: LspBadShape): {
    info: string;
    area: number;
    perimeter: number;
} {
    return {
        info: shape.getInfo(),
        area: shape.getArea(),
        perimeter: shape.getPerimeter(),
    };

}

// Использование - демонстрация проблем
const lspRectangle = new LspBadShape(4, 6);
const lspBadCircle = new LspBadCircle(5);
const lspBadTriangle = new LspBadTriangle(3, 4, 5);

lspBadProcessShape(lspRectangle);

lspBadProcessShape(lspBadCircle); // Будет работать, но поведение неожиданное

lspBadProcessShape(lspBadTriangle); // Будет работать, но поведение неожиданное 