
// Implements behavior for a toolbar
// The toolbar must have the following form. It can contain buttons or dropdown menus
/*
<div>
    <button data-action="myAction">My Action</button>
    <div class="dropdown-menu">
        <button data-action="menu">My Menu</button>
        <ul class="menu">
            <li data-value="option1">Option 1</li>
            <li data-value="option2">Option 2</li>
        </ul>
    </div>
<div>
*/

// $toolbar - The root div element of the toolbar
function Toolbar($toolbar)
{
    var _this = this;
    
    $("button", $toolbar).click(function(e) {
        onToolbarButtonClicked($(this));
    });
    $(".menu>li", $toolbar).click(function(e) {
        onMenuItemClicked($(this));
    });

    function onToolbarButtonClicked($button)
    {
        var action = $button.data("action");
        if (!_this.toolbarButtonClicked(action))
        {
            if (action == "menu")
            {
                showMenu($button.siblings("ul.menu"));
            }
            else
            {
                _this.hideMenus();
            }
        }
    }

    function showMenu($menu)
    {
        if ($menu.is(":visible"))
        {
            $menu.fadeOut("fast");
        }
        else
        {
            // Hide any open menus
            _this.hideMenus();
            // Show this menu
            $menu.fadeIn("fast");
        }
    }
    
    function onMenuItemClicked($item)
    {
        var $menu = $item.parent();
        var option = $menu.data("option");
        var value = $item.data("value");
        if (!_this.menuItemClicked(option, value))
        {
            $item.addClass("selected")
                 .siblings().removeClass("selected");
            $menu.fadeOut("fast");
        }
    }

    ///////////////////////////////////////////////////////////////////////////
    // Public methods
    this.toolbarButtonClicked = function(action)
    {
        return false;
    };
    
    this.menuItemClicked = function(option, value)
    {
        return false;
    };
    
    this.hideMenus = function()
    {
        $(".menu", $toolbar).hide();
    }
}