/*globals $*/
$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        },
		clear: function() {
			localStorage.notes = JSON.stringify([]);
		},
        deleteOne: function(index) {
            localStorage.notes = JSON.stringify(this.getAllNotes().splice(index,1));
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
				date: Date.now()
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes().reverse();
        },

        init: function() {
            model.init();
            view.init();
        },
		deleteAll: function() {
			model.clear();
			view.render();
		},
        deleteOne: function(index) {
            model.deleteOne(index);
            view.render();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
			var clearAll = $('#clear');
            newNoteForm.submit(function(e){
			     if(newNoteContent.val()) {
				    octopus.addNewNote(newNoteContent.val());
				    newNoteContent.val('');
				    e.preventDefault();
			     }
                $('#deleteOne').click(function(event) {
                    event.parent().remove();
                    octopus.deleteOne(octopus.getNotes().length);
                })
            })
			clearAll.click(function(e) {
				octopus.deleteAll();
				e.preventDefault();
			})
            view.render()
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        note.content +
                    '<br/>' +
					'<em class="note-date">'+
					  new Date(note.date) +
					'</em>'+
                    '<button id="deleteOne">' +
                    'delete' +
                    '</button>' +
					'</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});
